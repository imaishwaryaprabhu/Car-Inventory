const Joi = require('joi');

const validateLogin = (req, res, next) => {
    let errors = [];
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(1024).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        for (let i = 0; i < error.details.length; i++) {
            errors.push(error.details[i].message);
        }
        return res.status(400).send({ message: "Invalid Request", errors: error });
    }

    next();
}

exports.validateLogin = validateLogin;