const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require('../config')
const ExpressError = require('../expressError');

function createToken(admin_email){
    try {
        let payload = {
            email: admin_email
        };
        return jwt.sign(payload,SECRET_KEY, {expiresIn: "24h"});
    } catch (err){
        throw new ExpressError("Issue assigning token",500);
    }
}

module.exports = createToken;