import type { Request, Response, NextFunction } from "express"
import { Todo } from '../models/todo.js'

export class TodoController {
    private todos: Todo[] = []

    constructor() {
        this.createTodo = this.createTodo.bind(this)
        this.getTodos = this.getTodos.bind(this)
        this.updateTodo = this.updateTodo.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
    }

    createTodo(req: Request, res: Response, next: NextFunction) {
        try {
            const task = (req.body as { task: string }).task
            const newTodo = new Todo(Math.random().toString(), task)
            this.todos.push(newTodo)
            res.status(201).json({
                message: 'Created new todo',
                createdTask: newTodo
            })
        } catch (error) {
            next(error)
        }
    }

    getTodos(_req: Request, res: Response) {
        res.status(200).json({ tasks: this.todos })
    }

    updateTodo(req: Request, res: Response) {
        const todoIndex = this.todos.findIndex((todo) => todo.id === req.params.id)
        if (todoIndex < 0) {
            res.status(404).json({ message: 'Todo not found' })
            return
        }

        const updatedTask = (req.body as { task: string }).task
        this.todos[todoIndex] = new Todo(this.todos[todoIndex].id, updatedTask)
        res.status(200).json({
            message: 'Todo is updated!',
            updatedTask: this.todos[todoIndex]
        })
    }

    deleteTodo(req: Request, res: Response) {
        const todoIndex = this.todos.findIndex((item) => item.id === req.params.id)
        if (todoIndex === -1) {
            res.status(404).json({ message: 'Todo not found' })
            return
        }

        this.todos.splice(todoIndex, 1)
        res.status(200).json({ message: 'Todo is deleted!' })
    }
}

export const todoController = new TodoController()
