const router = require('../routes/index.js')

const getIndex = (req, res) => {
    res.render ('index')
}

const post_index = (req,res) => {
    console.log(req.body.title)
    res.redirect('/')
}

module.exports = {
    getIndex: getIndex,
    post_index: post_index
}