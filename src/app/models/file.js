const db = require('../../config/db')

module.exports = {
    async insert({ filename, path }) {
        if (path.includes('public')) {
            path = path.replace('public', '')
        }

        const query = `INSERT INTO files (id, name, path)
                       VALUES (DEFAULT, $1, $2)
                       RETURNING id`

        const values = [
            filename,
            path
        ]

        return await db.query(query, values)
    }
}