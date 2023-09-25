import { RequestHandler } from 'express';

import Users from '../models/users';
import Todos from '../models/todos';
import TaskCategories from '../models/taskCategories';

const getTodos: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  const user = req.user as Users;

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
};

const createTodo: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  const user = req.user as Users;

  const { title, categoryId, date } = req.body;

  try {
    const todo = await Todos.create({
      userId: user.userId,
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

    res.status(200).send(todoObj);

    return;
  } catch (error) {
    throw error;
  }
};

export { getTodos, createTodo };
