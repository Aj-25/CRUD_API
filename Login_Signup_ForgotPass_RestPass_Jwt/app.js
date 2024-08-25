const {app_port} = require('./config/config');
const usersRouter = require('./src/routes/userRoutes');
const adminRouter = require('./src/routes/adminRoutes');
const db = require('./db_model/index')
const express = require('express');

const app = express();
app.use(express.json());


//db.sequelize.sync({ alter: true });
//drop the table if it already exists

// db.sequelize.sync({alter:true}).then(() => {
//   console.log("Drop and re-sync database table.");
// });


app.use('/users', usersRouter);
app.use('/admin', adminRouter);
port  = app_port;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
