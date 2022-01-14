const db = require('../../config/db')
const utils = require('../../lib/utils')

module.exports = {
    list(callback) {
        const query = `SELECT r.*, 
                           (SELECT c.name FROM chefs c WHERE c.id = r.chef_id) AS author
                       FROM recipes r 
                       ORDER BY r.title`

        db.query(query, (err, results) => {
            if (err) {
                throw `Data base  error: ${err}`
            }

            callback(results.rows)
        })
    },
    select(id, callback) {
        const query = `SELECT r.*, 
                           (SELECT c.name FROM chefs c WHERE c.id = r.chef_id) AS author
                       FROM recipes r
                       WHERE r.id = ${Number(id)}`

        db.query(query, (err, results) => {
            if (err) {
                throw `Data base  error: ${err}`
            }

            callback(results.rows[0])
        })
    },
    findBy(search, callback) {
        const query = `SELECT r.*, 
                           (SELECT c.name FROM chefs c WHERE c.id = r.chef_id) AS author
                       FROM recipes r
                       WHERE UPPER(r.title) LIKE UPPER('%${search}%')`

        db.query(query, (err, results) => {
            if (err) {
                throw `Data base  error: ${err}`
            }

            callback(results.rows)
        })
    },
    insert(data, callback) {
        let { title, author, image, ingredients, preparation, information } = data

        const query = `INSERT INTO recipes (id, chef_id, image, title, ingredients, preparation, information, created_at)
                       VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)
                       RETURNING id`

        const values = [
            1,
            image,
            title,
            ingredients,
            preparation,
            information,
            utils.date(Date.now()).iso
        ]

        db.query(query, values, (err, results) => {
            if (err) {
                throw `Data base  error: ${err}`
            }

            callback(results.rows[0])
        })
    },
    update(id, data, callback) {
        let { title, image, ingredients, preparation, information } = data

        const query = `UPDATE recipes 
                       SET image = $2, 
                           title = $3, 
                           ingredients = $4, 
                           preparation = $5, 
                           information = $6
                       WHERE id = $1`

        const values = [
            id,
            image,
            title,
            ingredients,
            preparation,
            information
        ]

        db.query(query, values, (err, results) => {
            if (err) {
                throw `Data base  error: ${err}`
            }

            callback()
        })
    },
    delete(id, callback) {
        const query = `DELETE FROM recipes WHERE id = ${Number(id)}`

        db.query(query, (err, results) => {
            if (err) {
                throw `Data base  error: ${err}`
            }

            callback()
        })
    },
    listByChefId(chef_id, callback) {
        const query = `SELECT * FROM recipes WHERE chef_id = ${Number(chef_id)} ORDER BY title`

        db.query(query, (err, results) => {
            if (err) {
                throw `Data base  error: ${err}`
            }

            callback(results.rows)
        })
    }
}