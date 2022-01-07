const Masjid = require('../models/masjidModel');
const catchAsync = require('../utils/catchAsync');

exports.manageMasjids = catchAsync(async (req, res, next) => {
  const masjids = await Masjid.find();

  res.status(200).render('admin/manageMasjids.pug', {
    title: 'kelola masjid',
    masjids,
  });
});

exports.showMasjid = catchAsync(async (req, res, next) => {
  const masjid = await Masjid.findById(req.params.id);
  res.status(200).render('admin/showMasjid.pug', {
    title: 'manage players',
    masjid,
  });
});

exports.showDashboard = catchAsync(async (req, res, next) => {
  const nMasjid = await Masjid.count();
  const nWedding = await Masjid.count({ available_wedding: true });
  const nLibrary = await Masjid.count({ available_library: true });
  const nWorkshop = await Masjid.count({ available_workshop: true });

  res.status(200).render('admin/dashboard', {
    nMasjid,
    nWedding,
    nLibrary,
    nWorkshop,
  });
});
