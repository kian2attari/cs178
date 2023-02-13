const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//models
const TodoTask = require('./models/TodoTask');

const app = express();
dotenv.config();

//connection to db

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log('Connected to db!');
  app.listen(3000, () => console.log('Server Up and running'));
});

app.set('view engine', 'ejs');
app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: true }));

// #Routing
// GET METHOD
app.get('/', (req, res) => {
  TodoTask.find({}, (err, tasks) => {
    res.render('todo.ejs', { todoTasks: tasks });
  });
});

//POST METHOD
app.post('/', async (req, res) => {
  const todoTask = new TodoTask({ content: req.body.content });
  try {
    await todoTask.save();
    res.redirect('/');
  } catch (err) {
    res.redirect('/');
  }
});
