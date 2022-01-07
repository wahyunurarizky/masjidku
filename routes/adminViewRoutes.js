const express = require('express');
const authController = require('../controllers/authControllers');
const viewController = require('../controllers/viewAdminControllers');
// const scheduleController = require('../controllers/scheduleControllers');

const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.get('/', viewController.showDashboard);
router.get('/manage-masjids', viewController.manageMasjids);
router.get('/manage-masjid/:id', viewController.showMasjid);

module.exports = router;
