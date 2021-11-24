const Masjid = require('../models/masjidModel');
const catchAsync = require('../utils/catchAsync');

exports.manageMasjids = catchAsync(async (req, res, next) => {
  const masjids = await Masjid.find();

  res.status(200).render('admin/managemasjids.pug', {
    title: 'kelola masjid',
    masjids,
  });
});
