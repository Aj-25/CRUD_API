const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { create, getAll, getById, update, remove } = require('../controllers/todoController');

router.use(auth);
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
