const db = require('../db')
const ExpressError = require('../expressError')

const Tag = require('./tag')

class ReferencePoint {
    static async create({type,
        sparker,
        thought,
        observation, 
        response,
        emotions, 
        universal,
        action,
        qualities,
        connection_point,
        username}) {
            const results = await db.query(
                `INSERT INTO reference_points
                (type, sparker, thought, observation, emotions, universal,
                    action, qualities, connection_point, user_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING type, 
                    sparker, 
                    thought, 
                    observation, 
                    response,
                    emotions, 
                    universal,
                    action,
                    qualities,
                    connection_point,
                    username`,
                [
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
                    username
                ]
            )
            const referencePoint = results.rows[0]
            return referencePoint
        }
    
        static async getAll() {
            const results = await db.query(
                `SELECT type, 
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
                FROM reference_points`)
    
            const referencePoint = results.rows
            return referencePoint
        }

        static async getAll(filters = {}) {
            let query = `SELECT r.type,
                r.sparker,
                r.thought, 
                r.observation, 
                r.response,
                r.emotions, 
                r.universal,
                r.action,
                r.qualities,
                r.connection_point,
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
                    ON sub.id = r.subcategory_id`
            let whereStatement = []
            let values = []

            const {tag} = filters
    
            if (tag) {
                values.push(tag)
                console.log('values', values)
                whereStatement.push(`
                    JOIN tags_reference_points AS tp 
                        ON r.id = tp.reference_point_id
                    JOIN tags AS t 
                        ON tp.tag_id = t.id 
                    WHERE t.id = $1
                `)
                query += whereStatement
                console.log(query)
            }
            
            
            const referencePoint = await db.query(query, values)
            return referencePoint.rows
        }

        
    static async get(id) {
        const results = await db.query(
            `SELECT type, 
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
            WHERE id = $1`, [id])

        const referencePoint = results.rows[0]
        return referencePoint
    }

    static async update(id, 
        {headerSituation, 
        headerSpecification, 
        category, 
        subcategory}) {
        const results = await db.query(
            `UPDATE reference_points
            SET headerSituation = $2, 
                headerSpecification = $3, 
                category = $4, 
                subcategory = $5
            FROM reference_points AS r
                JOIN header_situations AS sit 
                    ON sit.id = r.header_situation_id
                JOIN header_specifications AS spec 
                    ON spec.id = r.header_specification_id
                JOIN category AS c 
                    ON c.id = r.category_id
                JOIN subcategory AS sub 
                    ON sub.id = r.subcategory_id
            WHERE id = $1
            RETURNING type, 
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
                headerSituation, 
                headerSpecification, 
                category, 
                subcategory
            ` , 
            [
                id,
                headerSituation, 
                headerSpecification, 
                category, 
                subcategory
            ])
    
    const referencePoint = results.rows[0]
    return referencePoint
    } 


    static async remove(id) {
        const results = await db.query(
            `DELETE
            FROM reference_points
            WHERE id = $1
            RETURNING id`, [id])

        const referencePoint = results.rows[0]
        if (!referencePoint) throw new ExpressError(`No Reference Point With Id: ${id} Found`)
        return referencePoint
    }
}

module.exports = ReferencePoint