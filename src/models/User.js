//Libraries
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Config user
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
    },
    createdCourses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course',
    }],
    signedUpCourses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course',
    }],
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 13);

});

// userSchema.virtual('errors')

//* Missmatch 1
// userSchema.virtual('rePassword')
//     .set(function (value) {
//         if (value !== this.password) {
//             throw new Error('Password missmatch!');
//         }
//     })

const User = mongoose.model('User', userSchema);

module.exports = User;