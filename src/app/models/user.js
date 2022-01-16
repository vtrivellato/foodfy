const db = require('../../config/db')
const utils = require('../../lib/utils')

module.exports = {
    list(callback) {
        const query = `SELECT u.*
                       FROM users u
                       ORDER BY u.name`

        db.query(query, (err, results) => {
            if (err) {
                throw `Data base  error: ${err}`
            }

            callback(results.rows)
        })
    },
    select(id, callback) {
        const query = `SELECT u.*
                           FROM users u
                       WHERE u.id = ${Number(id)}`

        db.query(query, (err, results) => {
            if (err) {
                throw `Data base  error: ${err}`
            }

            callback(results.rows[0])
        })
    },
    insert(data, callback) {
        let { name, email, password, isAdmin } = data

        const query = `INSERT INTO users (id, name, email, password, is_admin, created_at)
                       VALUES (DEFAULT, $1, $2, $3, $4, $5)
                       RETURNING id`

        const values = [
            name,
            email,
            password,
            Boolean(isAdmin),
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
        let { name, email, password } = data

        const query = `UPDATE users 
                       SET name = $2, 
                           email = $3, 
                           password = $4
                       WHERE id = $1`

        const values = [
            id,
            name,
            email,
            password
        ]

        db.query(query, values, (err, results) => {
            if (err) {
                throw `Data base  error: ${err}`
            }

            callback()
        })
    },
    delete(id, callback) {
        const query = `DELETE FROM users WHERE id = ${Number(id)}`

        db.query(query, (err, results) => {
            if (err) {
                throw `Data base  error: ${err}`
            }

            callback()
        })
    }
}