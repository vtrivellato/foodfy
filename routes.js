const express = require('express')
const recipes = require('./controllers/admin/recipes')

const routes = express.Router()

routes.get('/', recipes.index)

routes.get('/recipes/create', recipes.create)

routes.get('/recipes/:id', recipes.show)

routes.get('/recipes/:id/edit', recipes.edit)

routes.get('/recipes', (req, res) => {
    return res.render('recipes')
})

routes.get('/about', (req, res) => {
    return res.render('about')
})

module.exports = routes