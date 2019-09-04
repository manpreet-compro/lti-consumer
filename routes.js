const router = require('express').Router();
const AppController = require('./controllers/AppController')

//Handle LTI
router.get('/ltilaunch', AppController.handleLtiLaunch)

// Home Page
router.get('/', AppController.renderHomePage)

module.exports = router;