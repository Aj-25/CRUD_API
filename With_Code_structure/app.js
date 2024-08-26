const express = require('express');
const dotenv = require('dotenv');
const reminderRoutes = require('./src/routes/reminderRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/reminder', reminderRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: 'NOT_FOUND',
    message: 'The requested resource was not found on this server.'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
