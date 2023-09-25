import express from 'express';

import { createTodo, getTodos } from '../controllers/todo';

const todoRouter = express.Router();

todoRouter.get('/', getTodos);

todoRouter.post('/', createTodo);

export default todoRouter;
