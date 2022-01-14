const chef = require('../../models/chef')
const recipe = require('../../models/recipe')

module.exports = {
    index(req, res) {
        recipe.list(recipes => {
            return res.render('site/index', { recipes })
        })
    },
    list(req, res) {
        const { search } = req.query

        if (!search) {
            recipe.list(recipes => {
                return res.render('site/recipes', { recipes })
            })
        } else {
            recipe.findBy(search, recipes => {
                return res.render('site/recipes', { recipes })
            })
        }
    },
    chefs(req, res) {
        chef.list(chefs => {
            return res.render('site/chefs', { chefs })
        })
    }
}