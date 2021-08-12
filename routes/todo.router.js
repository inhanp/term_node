var express = require('express');
var router = express.Router();
const todoController = require('../controllers/todo.controller');

router.get('/gettodos', todoController.getAllTodos);
router.post('/addtodo', todoController.addTodo);
router.post('/edittodo', todoController.editTodo);
router.delete('/:date', todoController.deleteTodo);

module.exports = router;
