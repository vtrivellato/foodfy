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
    const keys = Object.keys(req.body)

    for (const key of keys) {
        if (req.body[key] == '') {
            return res.send(`The ${key} field is mandatory.`)
        }
    }

    let { title, author, image } = req.body

    const id = utils.sequencer(data.recipes)
    const created_at = Date.now()

    data.recipes.push({
        id,
        title,
        author,
        image,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) {
            return res.send('Error writing recipe to file.')
        }

        return res.redirect('/admin/recipes')
    })
}

exports.put = (req, res) => {
    const { id } = req.params
    let foundIndex = 0

    const foundRecipe = data.recipes.find((recipe, index) => {
        foundIndex = index
        return recipe.id == id
    })

    const recipe = {
        ...foundRecipe,
        ...req.body,
        id: Number(id)
    }

    data.recipes[foundIndex] = recipe

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) {
            return res.send('Error writing recipe to file.')
        }

        return res.redirect(`/admin/recipes`)
    })
}

exports.delete = (req, res) => {
    const { id } = req.params

    const filteredRecipes = data.recipes.filter(recipe => {
        return recipe.id != id
    })

    data.recipes = filteredRecipes

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) {
            return res.send('Error writing to file.')
        }

        return res.redirect(`/admin/recipes`)
    })
}