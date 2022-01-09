const express = require('express')
const recipes = require('./controllers/recipes/recipes')
const adminRecipes = require('./controllers/admin/recipes')

const routes = express.Router()

//#region /recipes

routes.get('/', recipes.index)

routes.get('/recipes', recipes.list)

//#endregion

//#region /admin/recipes

routes.get('/admin', (req, res) => {
    res.redirect('/admin/recipes')
})

routes.get('/admin/recipes', adminRecipes.index)

routes.get('/admin/recipes/create', adminRecipes.create)

routes.get('/admin/recipes/:id', adminRecipes.show)

routes.get('/admin/recipes/:id/edit', adminRecipes.edit)

//#endregion

routes.get('/about', (req, res) => {
    return res.render('about')
})

module.exports = routes