const recipe = require('../../models/recipe')

module.exports = {
    index(req, res) {
        recipe.list(recipes => {
            return res.render('admin/index', { recipes })
        })
    },
    create(req, res) {
        return res.render('admin/create')
    },
    show(req, res) {
        const { id } = req.params

        recipe.select(id, (recipe) => {
            return res.render('admin/details', { recipe })
        })
    },
    edit(req, res) {
        const { id } = req.params

        recipe.select(id, recipe => {
            return res.render('admin/edit', { recipe })
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (const key of keys) {
            if (req.body[key] == '') {
                return res.send(`The ${key} field is mandatory.`)
            }
        }

        recipe.insert(req.body, recipe => {
            return res.redirect(`recipes/${recipe.id}`)
        })
    },
    put(req, res) {
        const { id } = req.params

        const keys = Object.keys(req.body)

        for (const key of keys) {
            if (req.body[key] == '') {
                return res.send(`The ${key} field is mandatory.`)
            }
        }

        recipe.update(id, req.body, () => {
            return res.redirect(`/admin/recipes/${id}`)
        })
    },
    delete(req, res) {
        const { id } = req.params

        recipe.delete(id, () => {
            return res.redirect(`/admin/recipes`)
        })
    }
}