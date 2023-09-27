import { RequestHandler } from 'express';
import Users from '../models/users';
import Categories from '../models/categories';

const getCategories: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  const user = req.user as Users;

  try {
    const categories = await Categories.findAll({
      attributes: ['categoryId', 'name', 'color', 'createdAt'],
      where: {
        userId: user.userId,
      },
    });

    res.status(200).send({ categories });

    return;
  } catch (err) {
    throw err;
  }
};

const createCategory: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  const user = req.user as Users;

  try {
    const category = await Categories.create({
      ...req.body,
    });

    res.status(201).send({ category });

    return;
  } catch (err) {
    throw err;
  }
};

const updateCategory: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  const { id: categoryId } = req.params;

  const category = await Categories.findByPk(categoryId);

  if (!category) {
    res.status(404).send({ message: '존재하지 않는 카테고리입니다.' });

    return;
  }

  const editedCategory = await category.update({ ...req.body });

  res.status(200).send({ category: editedCategory });

  return;
};

const deleteCategory: RequestHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  const { id: categoryId } = req.params;

  const category = await Categories.findByPk(categoryId);

  if (!category) {
    res.status(404).send({ message: '존재하지 않는 카테고리입니다.' });
  }

  await Categories.destroy({
    where: {
      categoryId,
    },
  });

  res.status(204).send();

  return;
};

export { getCategories, createCategory, updateCategory, deleteCategory };
