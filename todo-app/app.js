const express = require("express");
const app = express();
const path = require("path");
const { Todo } = require("./models");


const bodyParser = require("body-parser");
app.use(bodyParser.json());

const db = require("./models/index");

// Add this before starting the server
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    app.listen(3000, () => {
      console.log("Started express server at port 3000");
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
// app.get("/", function (request, response) {
//   response.send("Hello World");
// });

// app.get("/", async (request, response) => {
//   const allTodos = await Todo.findAll();
//   if (request.accepts("html")) {
//     response.render('index', {
//       allTodos
//     });
//   } else {
//     response.json({
//       allTodos
//     });
//   }
// });

// app.js
app.get("/", async (request, response) => {
  try {
    const [overdue, dueToday, dueLater] = await Promise.all([
      Todo.getOverdueTodos(),
      Todo.getDueTodayTodos(),
      Todo.getDueLaterTodos()
    ]);

    if (request.accepts("html")) {
      response.render("index", {
        overdue,
        dueToday,
        dueLater,
        today: new Date().toISOString().split('T')[0]
      });
    } else {
      response.json({ overdue, dueToday, dueLater });
    }
  } catch (error) {
    console.error(error);
    return response.status(422).json(error);
  }
});

// app.js
app.post("/todos", async function (request, response) {
  try {
    await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate || new Date().toISOString().split('T')[0],
      completed: false
    });
    return response.redirect("/");
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    const todo = await Todo.addTodo(request.body);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  try {
    const todo = await Todo.findByPk(request.params.id);
    if (todo) {
      await todo.destroy();
      return response.send(true);
    } else {
      return response.send(false);
    }
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

module.exports = app;
