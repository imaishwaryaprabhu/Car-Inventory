const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('No token provided');

    try {
        const decoded = jwt.verify(token, 'privateKey');
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send("Invalid token");
    }
}
