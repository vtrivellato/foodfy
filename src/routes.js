const express = require('express')
const site = require('./app/controllers/site/site')
const recipes = require('./app/controllers/admin/recipes/recipes')
const chefs = require('./app/controllers/admin/chefs/chefs')

const routes = express.Router()

//#region site

routes.get('/', site.index)

routes.get('/recipes', site.list)

routes.get('/about', (req, res) => {
    return res.render('site/about')
})

routes.get('/chefs', site.chefs)

//#endregion

//#region /admin

routes.get('/admin', (req, res) => {
    res.render('admin/index')
})

//#region /admin/recipes

routes.get('/admin/recipes', recipes.index)

routes.get('/admin/recipes/create', recipes.create)

routes.get('/admin/recipes/:id', recipes.show)

routes.get('/admin/recipes/:id/edit', recipes.edit)

routes.post('/admin/recipes', recipes.post)

routes.put('/admin/recipes/:id', recipes.put)

routes.delete('/admin/recipes/:id', recipes.delete)

//#endregion

//#region /admin/chefs

routes.get('/admin/chefs', chefs.index)

routes.get('/admin/chefs/create', chefs.create)

routes.get('/admin/chefs/:id', chefs.show)

routes.get('/admin/chefs/:id/edit', chefs.edit)

routes.post('/admin/chefs', chefs.post)

routes.put('/admin/chefs/:id', chefs.put)

routes.delete('/admin/chefs/:id', chefs.delete)

//#endregion

//#endregion

module.exports = routes