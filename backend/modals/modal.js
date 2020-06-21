const mongoose = require('mongoose');
const Joi = require('joi');

const modalSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        trim: true
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Modal = mongoose.model('Modal', modalSchema);

function validateModal(modal) {
    let errors = [];

    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    });
    const { error } = schema.validate(modal);
    if (error) {
        for (let i = 0; i < error.details.length; i++) {
            errors.push(error.details[i].message);
        }
    }

    return errors;
}

exports.Modal = Modal;
exports.validate = validateModal;