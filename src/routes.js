const express = require('express')

const multer = require('./app/middlewares/multer')
const site = require('./app/controllers/site/site')
const recipes = require('./app/controllers/admin/recipes/recipes')
const chefs = require('./app/controllers/admin/chefs/chefs')
const users = require('./app/controllers/admin/users/users')

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

routes.post('/admin/chefs', multer.single('avatar'), chefs.post)

routes.put('/admin/chefs/:id', multer.single('avatar'), chefs.put)

routes.delete('/admin/chefs/:id', chefs.delete)

//#endregion

//#region /admin/users

routes.get('/admin/users', users.index)

routes.get('/admin/users/create', users.create)

routes.get('/admin/users/:id', users.show)

routes.get('/admin/users/:id/edit', users.edit)

routes.post('/admin/users', users.post)

routes.put('/admin/users/:id', users.put)

routes.delete('/admin/users/:id', users.delete)

//#endregion

//#endregion

module.exports = routes