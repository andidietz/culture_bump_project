const db = require('../db')
const ExpressError = require('../expressError')
const bcrypt = require('bcrypt')
const {BCRYPT_WORK_FACTOR} = require('../config')

class User {
    static async authenticate(username, password) {
        const results = await db.query(
            `SELECT username,
                password,
                email,
                name
            FROM users
            WHERE username = $1`, [username]
        )

        const user = results.rows[0]
        // console.log('models - login - query results', user)
        if (user) {
            const isValidUser = await bcrypt.compare(password, user.password)
            // console.log('models - isValidUser', isValidUser)

            if (isValidUser === true) {
                delete user.password
                return user
            }
        }
        // console.log('models - user - validated', user)
        throw new ExpressError('Invalid username or password')
    }

    static async register({username, email, name, password}) {
        // console.log('modules/users/register - username, email, name, password', username, email, name, password)
        // const duplicateCheck = await db.query(
        //     `SELECT username
        //     FROM users
        //     WHERE username = $1
        //     RETURNING username, email, name`, [username]
        // )

        // if (duplicateCheck.rows[0]) {
        //     throw new ExpressError('Username already in use')
        // }
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
        // console.log('modules/users/register - hashedPassword', hashedPassword)
        
        const results = await db.query(
            `INSERT INTO users
            (username, email, password, name)
            VALUES ($1, $2, $3, $4)
            RETURNING username, email, name`, [
                username, email, hashedPassword, name
            ]
        )

        const user = results.rows[0]
        // console.log('modules/users/register - user', user)

        return user
    }

    static async update(username, data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR)
        }
    }


    static async get(username) {
        const results = await db.query(
            `SELECT username, email, name
            FROM users
            WHERE username = $1`, [username]
        )

        const user = results.rows[0]
        if (!user) throw new ExpressError(`User ${username} Not Found`)

        return user
    }

    static async getUserReferencePoints(username) {
        const results = await db.query(
            `SELECT id,
                type,
                sparker,
                thought, 
                observation, 
                response,
                emotions, 
                universal,
                action,
                qualities,
                connection_point,
                user_id
            FROM reference_points
            WHERE user_id = $1`, [username]
        )
            
        const referencePoints = results.rows
        if (!referencePoints) throw new ExpressError(`Not Found`)
        // console.log('models - userReferencePoints', referencePoints)
        return referencePoints
    }

    static async getUserTags(username) {
        const results = await db.query(
            `SELECT t.tag,
                t.id
            FROM tags AS t
            JOIN users_tags AS ut 
                ON t.id = ut.tag_id
            JOIN users AS u 
                ON ut.user_id = u.username 
            WHERE u.username = $1`, [username]
        )
        
        const tags = results.rows
        // console.log('Models - Tags', tags)
        if (!tags) throw new ExpressError(`Not Found`)

        return tags
    }

    static async addUserTag({username, tagId}) {
        // console.log('Models Post Tag - data', tagId)
        const results = await db.query(
            `INSERT INTO users_tags
                (user_id, tag_id)
            VALUES ($1, $2)
            RETURNING user_id, tag_id`, [username, tagId]
        )
        
        const tag = results.rows[0]
        // console.log('Models Post - Tags', tag)
        if (!tag) throw new ExpressError(`Not Found`)

        return tag
    }


    static async remove(username) {
        const results = await db.query(
            `DELETE
            FROM users
            WHERE username = $1
            RETURNING username`, [username]
        )
        const user = results.rows[0]

        if (!user) throw new ExpressError(`User ${username} Not Found`)
    }
}

module.exports = User
