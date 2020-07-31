const { User, validate } = require('../modals/user');
const { validateLogin } = require('../middleware/validate-rest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
    const error = validate(req.body);
    if (error.length) return res.status(400).send({ message: "Invalid Request", errors: error });

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send({ message: "Email ID already registered" });

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(req.body.password, salt);

        user = new User({
            ...req.body,
            password: hash
        });
        await user.save();
        
        const token = jwt.sign({ id: user._id, email: user.email }, 'privateKey', { expiresIn: "1d"});  // key to be stored in env variable
        res.send({ message: "User Registered successfully", token: token, user: { name: user.firstname + user.lastname, email: user.email }});
    } catch (ex) {
        res.status(500).send({ message: "Internal server error" });
    }
});

router.post('/login', validateLogin, async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send({ message: "Invalid Email ID or password" });

        const result = await bcrypt.compare(req.body.password, user.password);
        if (!result) return res.status(400).send({ message: "Invalid Email ID or password" });

        delete user.password;
        const token = jwt.sign({ id: user._id, email: user.email }, 'privateKey');  // key to be stored in env variable
        res.send({ message: "User Logged in successfully", token: token, user: { name: user.firstname + user.lastname, email: user.email }});
    } catch (ex) {
        res.status(500).send({ message: "Internal server error" });
    }
});

module.exports = router;