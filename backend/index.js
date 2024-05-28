const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;

const sequelize = new Sequelize('exams_db', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

const Exam = require('./models/exam')(sequelize, DataTypes);
const Result = require('./models/result')(sequelize, DataTypes);

sequelize.sync();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/exams', require('./routes/exams'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
