"use strict"

require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY || "knock knock"

const PORT = process.env.PORT || 3001

function getDatabaseUri() {
    return (process.env.NODE_ENV === 'test') 
        ? 'culture_bump_test'
        : process.env.DATABASE_URL || 'culture_bump'
}

const BCRYPT_WORK_FACTOR = 12

module.exports = {
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri
}