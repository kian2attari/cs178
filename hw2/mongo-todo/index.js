const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.listen(3000, () => console.log("Server Up and running"));

// #Routing
app.get('/',(req, res) => {
    // #Template
    res.render('todo.ejs');
});

app.post('/',(req, res) => {console.log(req.body);});