const express = require('express');
// const Team = require('../models/teamModel');
const authController = require('../controllers/authControllers');
// const authController = require('../controllers/authControllers');
const viewController = require('../controllers/mainViewControllers');

const router = express.Router();

router.get('/', viewController.getOverview);
router.get('/login', authController.isLoggedIn, (req, res) => {
  if (res.locals.user) {
    return res.redirect('/admin');
  }
  res.status(200).render('login');
});
// router.get('/teams/:slug', viewController.getTeamView);
// router.get('/schedule', viewController.getScheduleView);
// router.get('/teams', viewController.getTeamsView);
// router.get('/standings', viewController.getStandingsView);
// router.get('/top-mvp', viewController.getMvpView);
// router.get('/about', viewController.getAboutView);

module.exports = router;
