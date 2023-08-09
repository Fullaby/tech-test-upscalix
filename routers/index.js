const router= require('express').Router();
const Controller= require('../controllers/ControllerData');
const schedule = require('node-schedule');

router.get('/send-email', Controller.sendMessage)
router.post('/user', Controller.createUser)
router.put('/user/:nameFirst/:secondName/:dateUser', Controller.userEdit)
router.delete('/user/:firstName/:lastName/:date', Controller.deleteUser)

module.exports= router