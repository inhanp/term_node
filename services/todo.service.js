const db = require('../_helpers/database');
const Todo = db.Todo;

module.exports = {
    getAllTodos,
    addTodo,
    editTodo,
    deleteTodo
}

async function getAllTodos(username) {
    return await Todo.find({createdBy: username});
}

async function addTodo(todo, username) {
    if (await Todo.findOne({ createdBy: username, createdDate: Date.now(), dueDate: todo.dueDate })) {
        throw 'Todo created by' + todo.createdBy + 'on' + todo.createdDate + 'already exists';
    }
    else if (!username) {
        throw 'Error with the user submitting the request. User information missing. Malformed request.';
    }

    let newTodo = todo;
    todo.createdBy = username;
    todo.createdDate = Date.now();

    dbrecord = new Todo(newTodo);

    await dbrecord.save();
    console.log('added');
}

async function editTodo(todo, username) {
    if (!username) {
        throw 'Error with the user submitting the request. User information missing. Malformed request.';
    }

    const currentTodo = await Todo.findOne({ createdBy: username, createdDate: todo.createdDate});
    await currentTodo.updateOne({task: todo.task, dueDate: todo.dueDate});

}

async function deleteTodo(date, username) {
    todo = await Todo.findOne({createdBy: username, createdDate: date});
    todo.remove();
}
