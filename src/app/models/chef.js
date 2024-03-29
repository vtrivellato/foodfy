const db = require('../../config/db')
const utils = require('../../lib/utils')

module.exports = {
    list(callback) {
        const query = `SELECT c.*, 
                           (SELECT f.path FROM files f WHERE f.id = c.file_id) AS avatar_url,
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
                           (SELECT f.path FROM files f WHERE f.id = c.file_id) AS avatar_url,
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
    async insert(data) {
        let { name, file_id } = data

        const query = `INSERT INTO chefs (id, name, file_id, created_at)
                       VALUES (DEFAULT, $1, $2, $3)
                       RETURNING id`

        const values = [
            name,
            file_id,
            utils.date(Date.now()).iso
        ]

        return await db.query(query, values)
    },
    update(id, data, callback) {
        let { name } = data

        const query = `UPDATE chefs 
                       SET name = $2
                       WHERE id = $1`

        const values = [
            id,
            name
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