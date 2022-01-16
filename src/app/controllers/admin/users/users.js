const chef = require('../../../models/chef')
const user = require('../../../models/user')

module.exports = {
    index(req, res) {
        user.list(users => {
            return res.render('admin/users/index', { users })
        })
    },
    create(req, res) {
        return res.render('admin/users/create')
    },
    show(req, res) {
        const { id } = req.params

        user.select(id, user => {
            return res.render('admin/users/details', { user })
        })
    },
    edit(req, res) {
        const { id } = req.params

        user.select(id, user => {
            return res.render('admin/users/edit', { user })
        })
    },
    post(req, res) {
        user.insert(req.body, user => {
            return res.redirect(`users/${user.id}`)
        })
    },
    put(req, res) {
        const { id } = req.params

        user.update(id, req.body, () => {
            return res.redirect(`/admin/users/${id}`)
        })
    },
    delete(req, res) {
        const { id } = req.params

        user.delete(id, () => {
            return res.redirect(`/admin/users`)
        })
    }
}