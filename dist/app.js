import express from 'express';
import { json } from "express";
import todoRoutes from './routes/todos.js';
const app = express();
app.use(json());
app.use('/todos', todoRoutes);
app.use((error, req, res, next) => {
    res.json({ message: error.message });
});
app.listen(3011, () => {
    console.log("Server is started at http://localhost:3011");
});
//# sourceMappingURL=app.js.map