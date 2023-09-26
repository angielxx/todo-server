import express from 'express';

import { createTodo, getTodos, getTodosByQuery } from '../controllers/todo';

const todoRouter = express.Router();

todoRouter.get('/', getTodosByQuery);

todoRouter.get('/', getTodos);

todoRouter.post('/', createTodo);

export default todoRouter;
