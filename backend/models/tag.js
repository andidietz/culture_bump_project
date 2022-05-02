const db = require('../db')
const ExpressError = require('../expressError')

class Tag {
    static async create({tagId}) {
        const results = await db.query(
            `INSERT INTO tags (tag)   
            VALUES ($1)
            RETURNING tag`, [tagId])

        const tag = results.rows[0]
        return tag
    }

    static async get(id) {
        const results = await db.query(
            `SELECT tag
            FROM tags
            WHERE id = $1`, [id])

        const tag = results.row[0]
        return tag
    }

    static async update(id, tagId) {
        const results = await db.query(
            `UPDATE tags
            SET tag = $2
            WHERE id = $1
            RETURNING tag`, [id, tagId])

        const tag = results.rows[0]
        return tag
    }

    static async remove(id) {
        const results = await db.query(
            `DELETE
            FROM tags
            WHERE id = $1
            RETURNING id`, [id])

        const tag = results.rows[0]
        if (!tag) throw new ExpressError(`No Tag With Id: ${id} Found`)
        return tag
    }
}

module.exports = Tag