const { todoValidator } = require('../utils/validators');
const { createTodo, getTodosByUser, getTodoById, updateTodo, deleteTodo } = require('../queries/todoQueries');
const { Success, Error } = require('../utils/responseMessages');

exports.create = async (req, res) => {
  try {
    const { error } = todoValidator.validate(req.body);
    if (error) return res.status(Error.VALIDATION_ERROR.statusCode).json({ ...Error.VALIDATION_ERROR, details: error.details });
    const { title, description, status } = req.body;
    const id = await createTodo(req.user.id, title, description, status);
    return res.status(Success.TODO_CREATED.statusCode).json({ ...Success.TODO_CREATED, data: { id, title, description, status: status || 'incomplete' } });
  } catch (e) {
    return res.status(Error.TODO_CREATION_FAIL.statusCode).json(Error.TODO_CREATION_FAIL);
  }
};

exports.getAll = async (req, res) => {
  try {
    const todos = await getTodosByUser(req.user.id);
    return res.status(Success.TODO_FETCHED.statusCode).json({ ...Success.TODO_FETCHED, data: todos });
  } catch (e) {
    return res.status(Error.DEFAULT.statusCode).json(Error.DEFAULT);
  }
};

exports.getById = async (req, res) => {
  try {
    const todo = await getTodoById(req.params.id, req.user.id);
    if (!todo) return res.status(Error.TODO_NOT_FOUND.statusCode).json(Error.TODO_NOT_FOUND);
    return res.status(Success.TODO_FETCHED.statusCode).json({ ...Success.TODO_FETCHED, data: todo });
  } catch (e) {
    return res.status(Error.DEFAULT.statusCode).json(Error.DEFAULT);
  }
};

exports.update = async (req, res) => {
  try {
    const { error } = todoValidator.validate(req.body);
    if (error) return res.status(Error.VALIDATION_ERROR.statusCode).json({ ...Error.VALIDATION_ERROR, details: error.details });
    const { title, description, status } = req.body;
    const affected = await updateTodo(req.params.id, req.user.id, title, description, status);
    if (!affected) return res.status(Error.TODO_NOT_FOUND.statusCode).json(Error.TODO_NOT_FOUND);
    return res.status(Success.TODO_UPDATED.statusCode).json(Success.TODO_UPDATED);
  } catch (e) {
    return res.status(Error.DEFAULT.statusCode).json(Error.DEFAULT);
  }
};

exports.remove = async (req, res) => {
  try {
    const affected = await deleteTodo(req.params.id, req.user.id);
    if (!affected) return res.status(Error.TODO_NOT_FOUND.statusCode).json(Error.TODO_NOT_FOUND);
    return res.status(Success.TODO_DELETED.statusCode).json(Success.TODO_DELETED);
  } catch (e) {
    return res.status(Error.DEFAULT.statusCode).json(Error.DEFAULT);
  }
};
