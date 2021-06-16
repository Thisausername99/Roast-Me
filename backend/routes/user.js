const router = require('express').Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.get('/login', userCtrl.login);
router.delete('/delete/user/:id', userCtrl.delete); // pass in ID from request url

module.exports = router;