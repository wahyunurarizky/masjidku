const express = require('express');
const authController = require('../controllers/authControllers');
const viewController = require('../controllers/viewAdminControllers');
// const scheduleController = require('../controllers/scheduleControllers');

const router = express.Router();

router.use(authController.protect);

router.get('/', (req, res) => {
  res.status(200).render('admin/dashboard');
});
router.get('/manage-masjids', viewController.manageMasjids);

module.exports = router;
