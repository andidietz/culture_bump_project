const db = require('../db')
const ExpressError = require('../expressError')

class Bookmark {
    static async create({referencPointId, username}) {
        const results = await db.query(
            `INSERT INTO bookmarks (user_id, reference)
            VALUES ($1, $2)`, [username, referencPointId]
        )
        // QUESTION: does this need a return statement in query or in function?
        const bookmark = results.rows[0]
        return bookmark
    }

    static async get(username) {
        const results = await db.query(
            `SELECT r.universal, 
                r.action, 
                r.qualities,
                r.user_id, 
                sit.header_situation, 
                spec.header_specification, 
                c.category, 
                sub.subcategory
            FROM reference_points AS r
                JOIN header_situations AS sit 
                    ON sit.id = r.header_situation_id
                JOIN header_specifications AS spec 
                    ON spec.id = r.header_specification_id
                JOIN categories AS c 
                    ON c.id = r.category_id
                JOIN subcategories AS sub 
                    ON sub.id = r.subcategory_id
            WHERE r.user_id = $1`, [username]
        )

        const bookmarks = results.rows
        return bookmarks
    }

    static async remove(bookmarkId) {
        const results = await db.query(
            `DELETE
            FROM bookmarks
            WHERE id = $1
            RETURNING id`, [bookmarkId]
        )

        const bookmark = results.rows[0]
        return bookmark
    }
}

module.exports = Bookmark