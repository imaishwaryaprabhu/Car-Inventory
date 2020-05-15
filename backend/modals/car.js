const mongoose = require('mongoose');
const Joi = require('joi');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        trim: true
    },
    make: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        trim: true
    },
    modal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Modal'
    },
    price: {
        type: Number,
        min: 1,
        max: 10000,
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    imagePath: {
        type: String,
        minlength: 10,
        maxlength: 1024,
        required: true,
        trim: true
    },
    description: {
        type: String,
        minlength: 10,
        maxlength: 1024,
        required: true,
        trim: true
    }
});

const Car = mongoose.model('Car', carSchema);

function validateCar(car) {
    let errors = [];
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        make: Joi.string().min(3).max(50).required(),
        modalId: Joi.objectId().required(),
        price: Joi.number().min(1).max(10000).required(),
        launchDate: Joi.date().timestamp(),
        imagePath: Joi.string().pattern(new RegExp(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i)),
        description: Joi.string().min(10).max(1024).required()
    });
    const { error } = schema.validate(car);

    if (error) {
        for (let i = 0; i < error.details.length; i++) {
            errors.push(error.details[i].message);
        }
    }

    return errors;
}

exports.Car = Car;
exports.validate = validateCar;