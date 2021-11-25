const express = require('express');
const authController = require('../controllers/authControllers');
const masjidController = require('../controllers/masjidControllers');

const router = express.Router();

router.get('/', masjidController.getAllMasjid);
router.get('/:id', masjidController.getOneMasjid);

router
  .route('/sekitar/:distance/center/:latlng')
  .get(masjidController.getMasjidByCoordinates);

router.use(authController.protect); // protect all routes after this point
router.use(authController.restrictTo('admin'));
router.post(
  '/',
  masjidController.uploadMasjidImages,
  masjidController.resizeMasjidImages,
  (req, res, next) => {
    if (typeof req.body.location !== 'object') {
      req.body.location = JSON.parse(req.body.location);
    }
    next();
  },
  masjidController.createMasjid
);

router.patch(
  '/:id',
  masjidController.uploadMasjidImages,
  masjidController.resizeMasjidImages,
  (req, res, next) => {
    if (typeof req.body.location !== 'object') {
      req.body.location = JSON.parse(req.body.location);
    }
    next();
  },
  masjidController.updateMasjid
);
router.delete('/:id', masjidController.deleteMasjid);

module.exports = router;
