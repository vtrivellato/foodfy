module.exports = {
    index(req, res) {
        return res.render('index', { recipes: null })
    },
    list(req, res) {
        return res.render('recipes', { recipes: null })
    }
}