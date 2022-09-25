const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3300",
  password: "111111",
  database: "o2",
});
conn.connect();

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set("views", "./views_mysql");
app.set("view engine", "jade");

app.get("/topic/add", (req, res) => {
  const sql = "SELECT id,title FROM topic";
  conn.query(sql, (err, topics) => {
    if (err) {
      res.render(err);
      res.status(500).send("internal server error");
      return;
    }
    res.render("add", { topics: topics });
  });
  // fs.readdir("data", (err, files) => {
  //   res.render("add", { topics: files });
  // });
});
app.get(["/topic", "/topic/:id"], (req, res) => {
  const sql = "SELECT id,title FROM topic";
  conn.query(sql, (err, topics, fields) => {
    if (err) {
      res.render(err);
      res.status(500).send("internal server error");
      return;
    }
    const id = req.params.id;
    if (id) {
      const sql = "SELECT * FROM topic WHERE id=?";
      conn.query(sql, [id], (err, topic, fields) => {
        if (err) {
          res.render(err);
          res.status(500).send("internal server error");
          return;
        } else {
          res.render("view", { topics: topics, topic: topic[0] });
        }
      });
    } else {
      res.render("view", {
        topics: topics,
        // topic:
      });
    }
  });
});

app.post("/topic/add", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const author = req.body.author;
  fs.writeFile("data/" + title, description, (err) => {
    if (err) {
      res.status(500).send("internal server error");
    }
    res.redirect("/topic/" + title);
  });
  const sql = "INSERT INTO topic (title, description, author) VALUES(?,?,?)";
  conn.query(sql, [title, description, author], (err, result, fields) => {
    if (err) {
      console.log(err);
      res.status(500).send("internal server error");
    } else {
      res.redirect("/topic/" + result.insertId);
    }
  });
});

app.get(["/topic/:id/edit"], (req, res) => {
  const sql = "SELECT id,title FROM topic";
  conn.query(sql, (err, topics, fields) => {
    if (err) {
      res.render(err);
      res.status(500).send("internal server error");
      return;
    }
    const id = req.params.id;
    if (id) {
      const sql = "SELECT * FROM topic WHERE id=?";
      conn.query(sql, [id], (err, topic, fields) => {
        if (err) {
          res.render(err);
          res.status(500).send("internal server error");
          return;
        } else {
          res.render("edit", { topics: topics, topic: topic[0] });
        }
      });
    } else {
      console.log("there is no id ");
      res.status(500).send("internal server error");
    }
  });
});
app.post("/topic/:id/edit", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const author = req.body.author;
  const id = req.params.id;
  const sql = "UPDATE topic SET title=?, description=?, author=? WHERE id=?";
  conn.query(sql, [title, description, author, id], (err, topics, fields) => {
    if (err) {
      res.render(err);
      res.status(500).send("internal server error");
    } else {
      res.redirect("/topic/" + id);
    }
  });
});
app.get("/topic/:id/delete", (req, res) => {
  const sql = "SELECT id,title FROM topic";
  const id = req.params.id;
  conn.query(sql, (err, topics, fields) => {
    const sql = "SELECT * FROM topic WHERE id=?";

    conn.query(sql, [id], (err, topic) => {
      if (err) {
        res.status(500).send("internal server error");
        console.log(err);
      } else {
        if (topic.length === 0) {
          res.status(500).send("internal server error");
          console.log("there is no id");
        } else {
          res.render("delete", { topics: topics, topic: topic[0] });
        }
      }
    });
  });
  // res.render("delete");
});
app.post("/topic/:id/delete", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM topic WHERE id=?";
  conn.query(sql, [id], (err, result) => {
    res.redirect("/topic/" + id);
  });
});
app.listen(3000, () => {
  console.log("connected 3000 port ");
});
// conn.end();
