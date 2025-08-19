const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/authRoutes');
const todoRoutes = require('./src/routes/todoRoutes');

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true, service: 'todo-mysql-api' }));

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong.' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
