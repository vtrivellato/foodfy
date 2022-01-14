const chef = require('../../../models/chef')
const recipe = require('../../../models/recipe')
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
    post(req, res) {
        const keys = Object.keys(req.body)

        for (const key of keys) {
            if (req.body[key] == '') {
                return res.send(`The ${key} field is mandatory.`)
            }
        }

        chef.insert(req.body, chef => {
            return res.redirect(`chefs/${chef.id}`)
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

        chef.update(id, req.body, () => {
            return res.redirect(`/admin/chefs/${id}`)
        })
    },
    delete(req, res) {
        const { id } = req.params

        chef.delete(id, () => {
            return res.redirect(`/admin/chefs`)
        })
    }
}