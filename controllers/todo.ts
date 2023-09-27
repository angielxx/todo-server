import { RequestHandler } from 'express';

import Users from '../models/users';
import Todos from '../models/todos';
import TaskCategories from '../models/taskCategories';

const getTodos: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  const user = req.user as Users;

  try {
    const todos = await Todos.findAll({
      where: {
        userId: user.userId,
      },
      include: [
        {
          model: TaskCategories,
          attributes: ['categoryId'],
        },
      ],
    });

    res.status(200).send({ todos });

    return;
  } catch (err) {
    throw err;
  }
};

const getTodosByQuery: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  const user = req.user as Users;

  try {
    const todos = await Todos.findAll({
      order: [['createdAt', 'ASC']],
      attributes: ['date', 'isCompleted', 'title', 'todoId', 'createdAt'],
      where: {
        userId: user.userId,
        ...req.query,
      },
      include: [
        {
          model: TaskCategories,
          attributes: ['categoryId'],
        },
      ],
    });

    res.status(200).send({ todos });

    return;
  } catch (err) {
    throw err;
  }
};

const createTodo: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  const { userId } = req.user as Users;

  const { title, categoryId, date } = req.body;

  try {
    const todo = await Todos.create({
      userId,
      date,
      title,
      isCompleted: false,
    });

    if (categoryId) {
      await TaskCategories.create({
        categoryId,
        todoId: todo.todoId,
      });
    }

    const todoObj: Record<string, any> = todo.get({ plain: true });

    todoObj.categoryId = categoryId;

    res.status(201).send(todoObj);

    return;
  } catch (error) {
    throw error;
  }
};

const updateTodo: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  const { id } = req.params;

  const todo = await Todos.findByPk(id);

  if (!todo) {
    res.status(404).send({ message: '존재하지 않는 태스크' });

    return;
  }

  const editedTodo = await todo.update({ ...req.body });

  res.status(200).send({ todo: editedTodo });

  return;
};

const deleteTodo: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  const { id } = req.params;

  const todo = await Todos.findByPk(id);

  if (!todo) {
    res.status(404).send({ message: '존재하지 않는 태스크입니다.' });

    return;
  }

  await Todos.destroy({
    where: {
      todoId: todo.todoId,
    },
  });

  res.status(204).send();

  return;
};

export { getTodos, createTodo, getTodosByQuery, updateTodo, deleteTodo };
