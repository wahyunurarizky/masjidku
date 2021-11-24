const express = require('express');
// const authController = require('../controllers/authControllers');
// const viewController = require('../controllers/viewAdminControllers');
// const scheduleController = require('../controllers/scheduleControllers');

const router = express.Router();

router.get('/login', (req, res) => {
  res.status(200).render('admin/login');
});

module.exports = router;
