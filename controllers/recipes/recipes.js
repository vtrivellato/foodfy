const fs = require('fs')
const data = require('../../data.json')

exports.index = (req, res) => {
    return res.render('index', { recipes: data.recipes })
}

exports.list = (req, res) => {
    return res.render('recipes', { recipes: data.recipes })
}