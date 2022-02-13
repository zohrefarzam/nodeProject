const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('app/http/controllers/homeController');
const courseController = require('app/http/controllers/courseController');

// validators 
const commentValidator = require('app/http/validators/commentValidator');

// middlewares
const redirectIfNotAuthenticated = require('app/http/middleware/redirectIfNotAuthenticated');

router.get('/logout' , (req ,res) => {
    req.logout();
    res.clearCookie('remember_token');
    res.redirect('/');
});

// Home Routes
router.get('/' , homeController.index);
router.get('/about-me' , homeController.index);
router.get('/courses' , courseController.index);
router.get('/courses/:course' , courseController.single);
router.post('/courses/payment' , redirectIfNotAuthenticated.handle , courseController.payment);
router.get('/courses/payment/checker' , redirectIfNotAuthenticated.handle , courseController.checker);


router.post('/comment' , redirectIfNotAuthenticated.handle , commentValidator.handle() ,homeController.comment);
router.get('/download/:episode' , courseController.download);


module.exports = router;