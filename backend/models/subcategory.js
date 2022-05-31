const db = require('../db')
const ExpressError = require('../expressError')

class Subcategory {
    static async create({subcategory}) {
        const results = await db.query(
            `INSERT INTO subcategories (subcategory)   
            VALUES ($1)
            RETURNING id`, [subcategory])


        const subcategoryId = results.rows[0]
        return subcategoryId
    }

    static async getAll() {
        const results = await db.query(
            `SELECT id, 
                subcategory
            FROM subcategories`)

        const subcategories = results.rows
        return subcategories
    }

    static async getAllByCategoryId(id) {
        const results = await db.query(
            `SELECT DISTINCT  
                c.id AS categoryId, 
                sub.subcategory,
                sub.id AS subcategoryId
            FROM reference_points AS r
                JOIN categories AS c 
                    ON c.id = r.category_id
                JOIN subcategories AS sub 
                    ON sub.id = r.subcategory_id
                WHERE r.category_id = $1 
                AND r.inDirectory = true`, [id])

        const subcategories = results.rows
        return subcategories
    }

    static async getHeadersBySubcategoryId(categoryId, subcategoryId) {
        const results = await db.query(
            `SELECT  
                r.id,
                r.user_id, 
                sit.header_situation AS headerSituation, 
                t.tag,
                spec.header_specification AS headerSpecification
            FROM reference_points AS r
            JOIN header_situations AS sit 
                ON sit.id = r.header_situation_id
            JOIN header_specifications AS spec 
                ON spec.id = r.header_specification_id
            JOIN categories AS c 
                ON c.id = r.category_id
            JOIN tags AS t
                ON t.id = r.header_tag_id
            JOIN subcategories AS sub 
                ON sub.id = r.subcategory_id
            WHERE r.category_id = $1
            AND r.subcategory_id = $2
            AND r.inDirectory = true`, [categoryId, subcategoryId])

        const headers = results.rows
        return headers
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