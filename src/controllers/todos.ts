import type { Request, Response, NextFunction } from "express"
import { Todo } from '../models/todo.js'

const todos: Todo[] = []

export const createTodo = (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = (req.body as {task: string}).task
        const newTodo = new Todo(Math.random().toString(), task)
        todos.push(newTodo)
        res.status(201).json ({
            message: 'Created new todo',
            createdTask: newTodo
        })
    } catch(error) {
        next(error)
    }
}

export const getTodos = (_req: Request, res: Response) => {
    res.json({ todos })
}

export const updateTodo = (req: Request, res: Response) => {
    const todo = todos.find((item) => item.id === req.params.id)
    if (!todo) {
        res.status(404).json({ message: 'Todo not found' })
        return
    }

    const task = (req.body as { task?: unknown }).task
    if (typeof task !== 'string') {
        res.status(400).json({ message: 'Task must be a string' })
        return
    }

    todo.task = task
    res.json({ message: 'Todo updated', updatedTodo: todo })
}

export const deleteTodo = (req: Request, res: Response) => {
    const index = todos.findIndex((item) => item.id === req.params.id)
    if (index === -1) {
        res.status(404).json({ message: 'Todo not found' })
        return
    }

    const [deletedTodo] = todos.splice(index, 1)
    res.json({ message: 'Todo deleted', deletedTodo })
}