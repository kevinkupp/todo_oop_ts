import { Todo } from '../models/todo.js';
const todos = [];
export const createTodo = (req, res, next) => {
    try {
        const task = req.body.task;
        const newTodo = new Todo(Math.random().toString(), task);
        todos.push(newTodo);
        res.status(201).json({
            message: 'Created new todo',
            createdTask: newTodo
        });
    }
    catch (error) {
        next(error);
    }
};
export const getTodos = (req, res, next) => {
    try {
        res.status(201).json({
            tasks: todos
        });
    }
    catch (error) {
        console.log(error);
    }
};
export const updateTodo = (req, res) => {
    const todo = todos.find((item) => item.id === req.params.id);
    if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
    }
    const task = req.body.task;
    if (typeof task !== 'string') {
        res.status(400).json({ message: 'Task must be a string' });
        return;
    }
    todo.task = task;
    res.json({ message: 'Todo updated', updatedTodo: todo });
};
export const deleteTodo = (req, res) => {
    const index = todos.findIndex((item) => item.id === req.params.id);
    if (index === -1) {
        res.status(404).json({ message: 'Todo not found' });
        return;
    }
    const [deletedTodo] = todos.splice(index, 1);
    res.json({ message: 'Todo deleted', deletedTodo });
};
//# sourceMappingURL=todos.js.map