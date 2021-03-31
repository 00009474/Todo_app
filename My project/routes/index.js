const express = require('express');
const router = express.Router();
const fs = require('fs')
const DbFolder = './data/tododata.json'

const indexController = require('../controllers/index')

let todoDb = []

fs.readFile(DbFolder, (err, data) => {
	if (!err) {
		todoDb = JSON.parse(data)
	}
})

router.get('/', indexController.getIndex)

router.get('/', (req, res) => {
	fs.readFile(DbFolder, (err, data) =>{
		const todos = JSON.parse(data)
		res.render('index', {todos: todos})
	})
})

router.get ('/add', (req, res) => {
    res.render('index', {show: req.query.success})
})


function generateRandomId() {
	return Math.floor(Math.random() * 99999999999) + 1;
}

router.post('/add', (req, res) => {
    const note_todo = {
        id: generateRandomId(),
        body: req.body.title
    }

    todoDb.push(note_todo)
    fs.writeFile(DbFolder, JSON.stringify(todoDb), (err) => {
        if (err) {
			res.redirect('/add?success=0')
		} else {
			res.redirect('/add?success=1')
		}
    })
})

router.get('/add', (req, res) => {
	res.render('todos', {todos: todoDb})
})


// Get By ID
router.get('/add/:id', (req, res) => {
	const id = parseInt(req.params.id)
	const todo = todoDb.find(todo => todo.id === id)

	res.render('todo', {todo: todo})
})


// Delete
router.get('/add/:id/delete', (req, res) => {
	const id = parseInt(req.params.id)
	const index = todoDb.findIndex(todo => todo.id === id)

	todoDb.splice(index, 1)

	fs.writeFile('./data/tododata.json', JSON.stringify(todoDb), (err) => {
		if (err) {
			res.redirect('/add?success=0')
		} else {
			res.redirect('/add?success=1')
		}
	})
})


module.exports = router;