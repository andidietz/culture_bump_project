const db = require('../db')
const ExpressError = require('../expressError')

class Category {
    static async create({category}) {
        const results = await db.query(
            `INSERT INTO categories (category)   
            VALUES ($1)
            RETURNING category`, [category])

        const category = results.rows[0]
        return category
    }

    static async get(id) {
        const results = await db.query(
            `SELECT category
            FROM categories
            WHERE id = $1`, [id])

        const category = results.row[0]
        return category
    }

    static async update(id, category) {
        const results = await db.query(
            `UPDATE categories
            SET category = $2
            WHERE id = $1
            RETURNING category`, [category])

        const category = results.rows[0]
        return category
    }

    static async remove(id) {
        const results = await db.query(
            `DELETE
            FROM categories
            WHERE id = $1
            RETURNING id`, [id])

        const category = results.rows[0]
        if (!category) throw new ExpressError(`No category With Id: ${id} Found`)
        return category
    }
}

module.exports = Category