require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY || "my-key";
const PORT = +process.env.PORT || 3001;
const DATABASE_URI = process.env.DATABASE_URI || 'chi';
const BCRYPT_WORK_FACTOR = 12;

module.exports = {
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR,
    DATABASE_URI
}