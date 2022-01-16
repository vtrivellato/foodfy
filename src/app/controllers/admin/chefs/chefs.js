const chef = require('../../../models/chef')
const recipe = require('../../../models/recipe')
const file = require('../../../models/file')
const recipeFile = require('../../../models/recipeFile')
const utils = require('../../../../lib/utils')

module.exports = {
    index(req, res) {
        chef.list(chefs => {
            return res.render('admin/chefs/index', { chefs })
        })
    },
    create(req, res) {
        return res.render('admin/chefs/create')
    },
    show(req, res) {
        const { id } = req.params

        chef.select(id, chef => {
            chef.created_at = utils.date(chef.created_at).format

            recipe.listByChefId(chef.id, recipes => {
                for (const recipe of recipes) {
                    recipe.author = chef.name
                }

                chef.recipes = recipes

                return res.render('admin/chefs/details', { chef })
            })
        })
    },
    edit(req, res) {
        const { id } = req.params

        chef.select(id, chef => {
            return res.render('admin/chefs/edit', { chef })
        })
    },
    async post(req, res) {
        const keys = Object.keys(req.body)

        for (const key of keys) {
            if (req.body[key] == '') {
                return res.send(`The ${key} field is mandatory.`)
            }
        }

        if (!req.file) {
            return res.send('Attach a avatar image to continue.')
        }

        const resultsFile = await file.insert(req.file)
        const fileId = resultsFile.rows[0].id

        const results = await chef.insert({
            ...req.body,
            file_id: fileId
        })
        const chefId = results.rows[0].id

        return res.redirect(`chefs/${chefId}`)
    },
    put(req, res) {
        const { id } = req.params

        const keys = Object.keys(req.body)

        for (const key of keys) {
            if (req.body[key] == '') {
                return res.send(`The ${key} field is mandatory.`)
            }
        }

        chef.update(id, req.body, () => {
            return res.redirect(`/admin/chefs/${id}`)
        })
    },
    delete(req, res) {
        const { id } = req.params

        recipe.listByChefId(id, recipes => {
            if (recipes.length > 0) {
                return res.send('Não é possível deletar esse chef, ele ainda tem receitas cadastradas.')
            }

            chef.delete(id, () => {
                return res.redirect(`/admin/chefs`)
            })
        })
    }
}