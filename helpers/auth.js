const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');
const ExpressError = require('../expressError');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new ExpressError("Unauthorized to make that request",401);
    const token = authHeader.split(' ')[1];
    try {
        jwt.verify(token,SECRET_KEY);
        return next();
    } catch (err){
        throw new ExpressError("Unauthorized to make that request",401);
    }
};


module.exports = authenticateJWT;