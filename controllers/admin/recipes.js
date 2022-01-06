const fs = require('fs')
const data = require('../../data.json')

exports.index = (req, res) => {
    return res.render('recipes/index', { recipes: data.recipes })
}

exports.create = (req, res) => {
    return res.render('recipes/create')
}

exports.show = (req, res) => {
    const { id } = req.params

    const foundRecipe = data.recipes.find(recipe => {
        return recipe.id == id
    })

    if (!foundRecipe) {
        return res.send('Receita não encontrada.')
    }

    return res.send(foundRecipe)
}

exports.edit = (req, res) => {
    const { id } = req.params

    const recipeToEdit = data.recipes.find(recipe => {
        return recipe.id == id
    })

    if (!recipeToEdit) {
        return res.send('Receita não encontrada.')
    }

    return res.render('recipes/edit', { recipe: recipeToEdit })
}

exports.post = (req, res) => {

}

exports.put = (req, res) => {

}

exports.delete = (req, res) => {

}