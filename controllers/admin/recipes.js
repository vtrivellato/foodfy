const fs = require('fs')
const data = require('../../data.json')
const utils = require('../../utils')

exports.index = (req, res) => {
    return res.render('admin/index', { recipes: data.recipes })
}

exports.create = (req, res) => {
    return res.render('admin/create')
}

exports.show = (req, res) => {
    const { id } = req.params

    const foundRecipe = data.recipes.find(recipe => {
        return recipe.id == id
    })

    if (!foundRecipe) {
        return res.send('Receita não encontrada.')
    }

    const recipe = {
        ...foundRecipe,
        creation_date: new Intl.DateTimeFormat('pt-BR').format(foundRecipe.created_at)
    }

    return res.render('admin/details', { recipe })
}

exports.edit = (req, res) => {
    const { id } = req.params

    const recipeToEdit = data.recipes.find(recipe => {
        return recipe.id == id
    })

    if (!recipeToEdit) {
        return res.send('Receita não encontrada.')
    }

    const recipe = {
        ...recipeToEdit,
        creation_date: new Intl.DateTimeFormat('pt-BR').format(recipeToEdit.created_at)
    }

    return res.render('admin/edit', { recipe })
}

exports.post = (req, res) => {

}

exports.put = (req, res) => {

}

exports.delete = (req, res) => {

}