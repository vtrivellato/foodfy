const db = require('../../config/db')

module.exports = {
    async insert({ recipeId, fileId }) {
        const query = `INSERT INTO recipe_files (id, recipe_id, file_id)
                       VALUES (DEFAULT, $1, $2)
                       RETURNING id`

        const values = [
            recipeId,
            fileId
        ]

        return await db.query(query, values)
    }
}