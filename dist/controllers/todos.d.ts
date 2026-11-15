import type { Request, Response, NextFunction } from "express";
export declare class TodoController {
    private todos;
    constructor();
    createTodo(req: Request, res: Response, next: NextFunction): void;
    getTodos(_req: Request, res: Response): void;
    updateTodo(req: Request, res: Response): void;
    deleteTodo(req: Request, res: Response): void;
}
export declare const todoController: TodoController;
//# sourceMappingURL=todos.d.ts.map