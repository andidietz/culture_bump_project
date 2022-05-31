const db = require('../db')
const ExpressError = require('../expressError')

class HeaderSpecification {
    static async create(newHeaderSpecification) {
        const results = await db.query(
            `INSERT INTO header_specifications (header_specification)   
            VALUES ($1)
            RETURNING id`, [newHeaderSpecification])

        const headerSpecificationId = results.rows[0]
        return headerSpecificationId
    }

    static async getAll() {
        const results = await db.query(
            `SELECT id, header_specification
            FROM header_specifications`)

        const headerSpecifications = results.rows
        return headerSpecifications
    }

    static async get(id) {
        const results = await db.query(
            `SELECT header_specification
            FROM header_specifications
            WHERE id = $1`, [id])

        const headerSpecification = results.row[0]
        return headerSpecification
    }

    static async remove(id) {
        const results = await db.query(
            `DELETE
            FROM header_specifications
            WHERE id = $1
            RETURNING id`, [id])

        const headerSpecification = results.rows[0]
        if (!headerSpecification) throw new ExpressError(`No Header Specification With Id: ${id} Found`)
        return headerSpecification
    }
}

module.exports = HeaderSpecification