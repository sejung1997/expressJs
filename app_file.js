const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set("views", "./views_file");
app.set("view engine", "jade");

app.get("/topic/new", (req, res) => {
  fs.readdir("data", (err, files) => {
    res.render("new", { topics: files });
  });
});
app.get(["/topic", "/topic/:id"], (req, res) => {
  fs.readdir("data", (err, files) => {
    if (err) res.status(500).send("internal server error");
    const id = req.params.id;

    if (id) {
      fs.readFile("data/" + id, "utf8", (err, data) => {
        if (err) res.status(500).send("internal server error");
        res.render("view", { title: id, topics: files, description: data });
      });
    } else
      res.render("view", {
        topics: files,
        title: "welcome",
        description: "hello",
      });
  });
});

app.post("/topic", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  fs.writeFile("data/" + title, description, (err) => {
    if (err) {
      res.status(500).send("internal server error");
    }
    res.redirect("/topic/" + title);
  });
});
app.listen(3000, () => {
  console.log("connected 3000 port ");
});
