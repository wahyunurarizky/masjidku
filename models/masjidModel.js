const mongoose = require('mongoose');

const masjidSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'a mosque must have a name'],
      trim: true,
      maxlength: [
        50,
        'a mosque name must have less or equal than 50 characters',
      ],
      minlength: [
        10,
        'a mosque name must have more or equal than 10 characters',
      ],
    },
    imageCoverId: {
      type: String,
    },
    imageCoverUrl: {
      type: String,
      required: [true, 'a mosque must have a cover image'],
      default: process.env.DEFAULT_IMAGE,
    },
    imagesId: [String],
    imagesUrl: [String],
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'a ratings average must be above 1.0'],
      max: [5, 'a ratings average must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      maps_url: String,
    },
    phone: String,
    available_wedding: {
      type: Boolean,
      default: true,
    },
    available_workshop: {
      type: Boolean,
      default: true,
    },
    available_library: {
      type: Boolean,
      default: true,
    },
    desc_wedding: String,
    desc_workshop: String,
    desc_library: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);

masjidSchema.index({ location: '2dsphere' });

const Masjid = mongoose.model('Masjid', masjidSchema);
module.exports = Masjid;
