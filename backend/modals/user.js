const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        minlength: 5,
        maxlength: 20,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        minlength: 5,
        maxlength: 20,
        required: true,
        trim: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    let errors = [];
    const schema = Joi.object({
        firstname: Joi.string().min(5).max(20).required(),
        lastname: Joi.string().min(5).max(20).required(),
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(1024).required()
    });
    const { error } = schema.validate(user);
    if (error) {
        for (let i = 0; i < error.details.length; i++) {
            errors.push(error.details[i].message);
        }
    }

    return errors;
}

exports.User = User;
exports.validate = validateUser;