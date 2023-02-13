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
    // #Template rendering
    res.render('todo.ejs', { todoTasks: tasks });
  });
});

// #Routing
//POST METHOD
app.post('/', async (req, res) => {
  const todoTask = new TodoTask({ content: req.body.content });
  try {
    // #CRUD #Create
    await todoTask.save();
    res.redirect('/');
  } catch (err) {
    res.redirect('/');
  }
});

//UPDATE
app
  // #Routing
  .route('/edit/:id')
  .get((req, res) => {
    const id = req.params.id;
    // #CRUD #Read
    TodoTask.find({}, (err, tasks) => {
      // #Template rendering
      res.render('todoEdit.ejs', { todoTasks: tasks, idTask: id });
    });
  })
  .post((req, res) => {
    const id = req.params.id;
    // #CRUD #Update
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, (err) => {
      if (err) return res.send(500, err);
      res.redirect('/');
    });
  });

// #Routing
//DELETE
app.route('/remove/:id').get((req, res) => {
  const id = req.params.id;
  // #CRUD #Delete
  TodoTask.findByIdAndRemove(id, (err) => {
    if (err) return res.send(500, err);
    res.redirect('/');
  });
});
