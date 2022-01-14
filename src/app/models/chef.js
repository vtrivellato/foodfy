const db = require('../../config/db')
const utils = require('../../lib/utils')

module.exports = {
    list(callback) {
        const query = `SELECT c.*, 
                           (SELECT count(r.*) FROM recipes r WHERE r.chef_id = c.id) AS total
                       FROM chefs c 
                       ORDER BY name`

        db.query(query, (err, results) => {
            if (err) {
                throw `Data base  error: ${err}`
            }

            callback(results.rows)
        })
    },
    select(id, callback) {
        const query = `SELECT c.*, 
                           (SELECT count(r.*) FROM recipes r WHERE r.chef_id = c.id) AS total
                       FROM chefs c 
                       WHERE id = ${Number(id)}`

        db.query(query, (err, results) => {
            if (err) {
                throw `Data base  error: ${err}`
            }

            callback(results.rows[0])
        })
    },
    insert(data, callback) {
        let { name, avatar_url } = data

        const query = `INSERT INTO chefs (id, name, avatar_url, created_at)
                       VALUES (DEFAULT, $1, $2, $3)
                       RETURNING id`

        const values = [
            name,
            avatar_url,
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
        let { name, avatar_url } = data

        const query = `UPDATE chefs 
                       SET name = $2, 
                           avatar_url = $3
                       WHERE id = $1`

        const values = [
            id,
            name,
            avatar_url
        ]

        db.query(query, values, (err, results) => {
            if (err) {
                throw `Data base  error: ${err}`
            }

            callback()
        })
    },
    delete(id, callback) {
        const query = `DELETE FROM chefs WHERE id = ${Number(id)}`

        db.query(query, (err, results) => {
            if (err) {
                throw `Data base  error: ${err}`
            }

            callback()
        })
    }
}