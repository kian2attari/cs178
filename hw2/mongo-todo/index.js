const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.listen(3000, () => console.log("Server Up and running"));

// Routing
app.get('/',(req, res) => {
    res.render('todo.ejs');
});