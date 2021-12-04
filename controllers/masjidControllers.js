// const fs = require('fs');
const multer = require('multer');
const sharp = require('sharp');
const streamifier = require('streamifier');

const Masjid = require('../models/masjidModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const cloudinary = require('../utils/cloudinary');
const base = require('./baseController');

exports.getAllMasjid = base.getAll(Masjid, [], ['name'], 'createdAt');
exports.getOneMasjid = base.getOne(Masjid);
exports.createMasjid = base.createOne(
  Masjid,
  'name',
  'location',
  'imageCoverId',
  'imageCoverUrl',
  'imagesId',
  'imagesUrl',
  'ratingsAverage',
  'ratingsQuantity',
  'phone',
  'available_wedding',
  'desc_wedding',
  'desc_workshop',
  'desc_library',
  'available_workshop',
  'available_library',
  'maps_url'
);
exports.updateMasjid = base.updateOne(
  Masjid,
  'name',
  'location',
  'imageCoverId',
  'imageCoverUrl',
  'imagesId',
  'imagesUrl',
  'ratingsAverage',
  'ratingsQuantity',
  'phone',
  'available_wedding',
  'available_workshop',
  'available_library',
  'maps_url',
  'desc_wedding',
  'desc_workshop',
  'desc_library'
);
exports.deleteMasjid = base.deleteOne(Masjid);

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! please upload only images', 400), false);
  }
};

const upload = multer({
  storage: multer.memoryStorage({}),
  fileFilter: multerFilter,
});

exports.uploadMasjidImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

const streamUpload = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });

// upload.array()
exports.resizeMasjidImages = catchAsync(async (req, res, next) => {
  if (req.files === undefined) {
    return next();
  }
  if (req.files.imageCover) {
    const imageCoverSharp = await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toBuffer();

    const imageCoverCloud = await streamUpload(imageCoverSharp);
    req.body.imageCoverId = imageCoverCloud.public_id;
    req.body.imageCoverUrl = imageCoverCloud.secure_url;
  }
  if (req.files.images) {
    const imagesSharp = await Promise.all(
      req.files.images.map(
        async (file) =>
          await sharp(file.buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toBuffer()
      )
    );
    const imagesCloud = await Promise.all(
      imagesSharp.map(async (d) => await streamUpload(d))
    );
    req.body.imagesId = imagesCloud.map((d) => d.public_id);
    req.body.imagesUrl = imagesCloud.map((d) => d.secure_url);
  }

  next();
});

exports.getMasjidByCoordinates = catchAsync(async (req, res, next) => {
  const { distance, latlng } = req.params;
  const [lat, lng] = latlng.split(',');

  // radians menjadi mi atau km
  const radius = distance / 6378.16;

  if (!lat || !lng) {
    next(
      new AppError(
        'please provide latitude and longtidude in format lat,lng',
        400
      )
    );
  }
  const masjids = await Masjid.find({
    location: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    },
  });

  res.status(200).json({
    status: 'success',
    success: true,
    message: 'OK',
    code: '200',
    results: masjids.length,
    data: {
      data: masjids,
    },
  });
});
