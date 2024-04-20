//Libraries
const router = require('express').Router();

//Import controllers
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController')
const courseController = require('./controllers/courseController')

//Use routes
router.use(homeController);
router.use('/auth', authController);
router.use('/courses', courseController);

router.all('*', (request, response) => {
    response.render('404');
});

module.exports = router;
