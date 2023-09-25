import express from 'express';

const todoRouter = express.Router();

todoRouter.get('/todos', async (req, res, next) => {});

export default todoRouter;
