const db = require('../db')
const ExpressError = require('../expressError')

class ReferencePoint {


    static async update({
        header_situation_id,
        header_specification_id,
        header_tag_id,
        category_id,
        subcategory_id,
        indirectory,
        id
    }) {
        // console.log('models/refPoint/ - update - hitting')


        const results = await db.query(
            `UPDATE reference_points
            SET header_situation_id = $1,
                header_specification_id = $2,
                header_tag_id = $3,
                category_id = $4,
                subcategory_id = $5,
                indirectory = $6
            WHERE id = $7
            RETURNING id`, [
                header_situation_id,
                header_specification_id,
                header_tag_id,
                category_id,
                subcategory_id,
                indirectory,
                id
        ])

        const referencePointId = results.rows[0]
        // console.log('models/refPoint/ - update - referencePoint', referencePointId)
        return id
    }

  static async create({type,
    spark,
    thought,
    observation, 
    response,
    emotions, 
    universal,
    action,
    qualities,
    connectionPoint,
    username}) {
    
    // console.log('Models- refPoints - create', type,
        // spark,
        // thought,
        // observation, 
        // response,
        // emotions, 
        // universal,
        // action,
        // qualities,
        // connectionPoint,
        // username)
    const results = await db.query(
      `INSERT INTO reference_points
      (type, sparker, thought, observation, response, emotions, universal,
        action, qualities, connection_point,
        user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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
          user_id`,
        [
          type, 
          spark, 
          thought, 
          observation, 
          response,
          emotions, 
          universal,
          action,
          qualities,
          connectionPoint,
          username
        ]
      )
      const referencePoint = results.rows[0]
      console.log('models/refPoint/ - create - referencePoint', referencePoint)
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

        // static async getAll(filters = {}) {
        //     let query = `SELECT r.type,
        //         r.sparker,
        //         r.thought, 
        //         r.observation, 
        //         r.response,
        //         r.emotions, 
        //         r.universal,
        //         r.action,
        //         r.qualities,
        //         r.connection_point,
        //         r.user_id, 
        //         sit.header_situation, 
        //         spec.header_specification, 
        //         c.category, 
        //         sub.subcategory
        //     FROM reference_points AS r
        //         JOIN header_situations AS sit 
        //             ON sit.id = r.header_situation_id
        //         JOIN header_specifications AS spec 
        //             ON spec.id = r.header_specification_id
        //         JOIN categories AS c 
        //             ON c.id = r.category_id
        //         JOIN subcategories AS sub 
        //             ON sub.id = r.subcategory_id`
        //     let whereStatement = []
        //     let values = []

        //     const {tag} = filters
    
        //     if (tag) {
        //         values.push(tag)
        //         // console.log('values', values)
        //         whereStatement.push(`
        //             JOIN tags_reference_points AS tp 
        //                 ON r.id = tp.reference_point_id
        //             JOIN tags AS t 
        //                 ON tp.tag_id = t.id 
        //             WHERE t.id = $1
        //         `)
        //         query += whereStatement
        //         // console.log(query)
        //     }
            
            
        //     const referencePoint = await db.query(query, values)
        //     return referencePoint.rows
        // }

        
    static async getSpecificReferencePointInfoById(id) {
        // console.log('models - referencePoints - getById - hitting', id)
        const results = await db.query(
            `SELECT r.id,
                r.universal,
                r.action,
                r.qualities,
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
                WHERE r.id = $1`, [id])


        const referencePoint = results.rows[0]
        // console.log('models - referencePoints - getById - results.rows[0]', referencePoint)
        return referencePoint
    }

    static async getBasicReferencePointInfoById(id) {
        // console.log('models - referencePoints - getById - hitting', id)
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
            WHERE id=$1`, [id])


        const referencePoint = results.rows[0]
        // console.log('models - referencePoints - getById - results.rows[0]', referencePoint)
        return referencePoint
    }

    static async getById(id) {
        // console.log('models - referencePoints - getById - hitting', id)
        const results = await db.query(
            `SELECT r.id,
                r.universal,
                r.action,
                r.qualities,
                r.user_id, 
                sit.header_situation, 
                t.tag,
                spec.header_specification 
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
                WHERE r.id = $1`, [id])


        const referencePoint = results.rows[0]
        // console.log('models - referencePoints - getById - results.rows[0]', referencePoint)
        return referencePoint
    }

    static async getBySubcategory({subcategoryId, categoryId}) {
        const results = await db.query(
            `SELECT r.id,
                r.type,
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
                    ON sub.id = r.subcategory_id
                WHERE r.category_id = '1' 
                ORDER BY r.subcategory_id`, [categoryId])

        const referencePoint = results.rows[0]
        return referencePoint
    }


    // static async update(id, 
    //     {headerSituation, 
    //     headerSpecification, 
    //     category, 
    //     subcategory}) {
    //     const results = await db.query(
    //         `UPDATE reference_points
    //         SET headerSituation = $2, 
    //             headerSpecification = $3, 
    //             category = $4, 
    //             subcategory = $5
    //         FROM reference_points AS r
    //             JOIN header_situations AS sit 
    //                 ON sit.id = r.header_situation_id
    //             JOIN header_specifications AS spec 
    //                 ON spec.id = r.header_specification_id
    //             JOIN category AS c 
    //                 ON c.id = r.category_id
    //             JOIN subcategory AS sub 
    //                 ON sub.id = r.subcategory_id
    //         WHERE id = $1
    //         RETURNING type, 
    //             sparker, 
    //             thought, 
    //             observation, 
    //             response,
    //             emotions, 
    //             universal,
    //             action,
    //             qualities,
    //             connection_point,
    //             user_id
    //             headerSituation, 
    //             headerSpecification, 
    //             category, 
    //             subcategory
    //         ` , 
    //         [
    //             id,
    //             headerSituation, 
    //             headerSpecification, 
    //             category, 
    //             subcategory
    //         ])
    
    // const referencePoint = results.rows[0]
    // return referencePoint
    // } 


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