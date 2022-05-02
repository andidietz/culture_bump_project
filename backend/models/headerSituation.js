const db = require('../db')
const ExpressError = require('../expressError')

class HeaderSituation {
    static async create({headerSituation}) {
        const results = await db.query(
            `INSERT INTO header_situations (header_situation)   
            VALUES ($1)
            RETURNING header_situations`, [headerSituation])

        const headerSituation = results.rows[0]
        return headerSituation
    }

    static async get(id) {
        const results = await db.query(
            `SELECT header_situation
            FROM header_situations
            WHERE id = $1`, [id])

        const headerSituation = results.row[0]
        return headerSituation
    }

    static async update(id, headerSituation) {
        const results = await db.query(
            `UPDATE header_situations
            SET header_situation = $2
            WHERE id = $1
            RETURNING header_situation`, [id, headerSituation])

        const headerSituation = results.rows[0]
        return headerSituation
    }

    static async remove(id) {
        const results = await db.query(
            `DELETE
            FROM header_situations
            WHERE id = $1
            RETURNING id`, [id])

        const headerSituation = results.rows[0]
        if (!headerSituation) throw new ExpressError(`No Header Situation With Id: ${id} Found`)
        return headerSituation
    }
}

module.exports = HeaderSituation