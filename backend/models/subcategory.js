const db = require('../db')
const ExpressError = require('../expressError')

class Subcategory {
    static async create({subcategory}) {
        const results = await db.query(
            `INSERT INTO subcategories (subcategory)   
            VALUES ($1)
            RETURNING tag`, [subcategory])

        const subcategory = results.rows[0]
        return subcategory
    }

    static async get(id) {
        const results = await db.query(
            `SELECT subcategory
            FROM subcategories
            WHERE id = $1`, [id])

        const subcategory = results.row[0]
        return subcategory
    }

    static async update(id, subcategory) {
        const results = await db.query(
            `UPDATE subcategories
            SET subcategory = $2
            WHERE id = $1
            RETURNING subcategory`, [subcategory])

        const subcategory = results.rows[0]
        return subcategory
    }

    static async remove(id) {
        const results = await db.query(
            `DELETE
            FROM subcategories
            WHERE id = $1
            RETURNING id`, [id])

        const subcategory = results.rows[0]
        if (!subcategory) throw new ExpressError(`No subcategory With Id: ${id} Found`)
        return subcategory
    }
}

module.exports = Subcategory