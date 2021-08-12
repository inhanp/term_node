const todoService = require('../services/todo.service')
module.exports = {
    getAllTodos,
    addTodo,
    editTodo,
    deleteTodo
}

function getAllTodos(req, res, next) {
    todoService.getAllTodos().then(todos => res.json(todos)).catch(err => next(err))
}

function addTodo(req, res, next) {
    todoService.addTodo(req.body, req.user.sub).then(todo => res.json(todo)).catch(err => next(err))
}

function editTodo(req, res, next) {
    todoService.editTodo(req.body, req.user.sub).then(todo => res.json(todo)).catch(err => next(err))
}

function deleteTodo(req, res, next) {
    todoService.deleteTodo(req.params.date, req.user.sub).then(todo => res.json(todo)).catch(err => next(err))
}
