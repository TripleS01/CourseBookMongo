//Libraries
const mongoose = require('mongoose');

//Config course
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
    },
    type: {
        type: String,
        required: [true, 'Type is required!'],
    },
    certificate: {
        type: String,
        required: [true, 'Crtificate is required!'],
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
    },
    signUpList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;