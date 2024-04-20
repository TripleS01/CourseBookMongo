const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const courseService = require('../services/courseService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/', async (request, response) => {
    const courses = await courseService.getAll().lean();

    response.render('courses/catalog', { courses });
});

router.get('/:courseId/details', async (request, response) => {
    const course = await courseService.getOnePopulate(request.params.courseId).lean();

    const signUpUsers = course.signUpList.map(user => user.username).join(', ');
    const isOwner = course.owner && course.owner._id == request.user?._id;
    const isSigned = course.signUpList.some(user => user._id == request.user?._id);

    response.render('courses/details', { ...course, signUpUsers, isOwner, isSigned });
});

router.get('/:courseId/sign-up', async (request, response) => {
    await courseService.signUp(request.params.courseId, request.user._id);

    response.redirect(`/courses/${request.params.courseId}/details`);
});


router.get('/create', isAuth, async (request, response) => {

    response.render('courses/create');
});

router.post('/create', isAuth, async (request, response) => {
    const courseData = request.body;

    try {
        await courseService.create(request.user._id, courseData);
        // console.log(request.user._id); //*
        response.redirect('/courses');

    } catch (error) {
        response.render('courses/create', { ...courseData, error: getErrorMessage(error) });
    }
});

router.get('/:courseId/delete', isCourseOwner, async (request, response) => {
    await courseService.delete(request.params.courseId);

    response.redirect('/courses')
});

function isCourseOwner(request, response, next) {
    const course = courseService.getOne(request.params.courseId);

    if (course && course.owner != request.user?._id) {
        return response.redirect(`/courses/${request.params.courseId}/details`);
    }

    next();
}

module.exports = router;