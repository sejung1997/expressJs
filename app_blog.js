const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "jade"); // express jade 연결
app.set("views", "./views");
app.locals.pretty = true;
app.use(express.static("public"));

app.get("/template", (req, res) => {
  res.render("temp", { time: Date(), title: "jade" }); // views 폴더 안에 temp라는 파일 찾음
});
app.get("/form", (req, res) => {
  res.render("form");
});
app.get("/form_receiver", (req, res) => {
  const title = req.query.title;
  const description = req.query.description;
  res.send(title + "," + description);
});
app.post("/form_receiver", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  res.send(title + "," + description);
});
app.get("/topic/:id", (req, res) => {
  const as = `
    <a href="/topic?id=0">javaScript</a><br/>
    <a href="/topic?id=1">node</a><br/>
    <a href="/topic?id=2">express</a><br/>
    // ${req.query.id}
    ${req.params.id}
  `;
  res.send(as);
});

app.get("/topic/:id/:mode", (req, res) => {
  res.send(req.params.id + "," + req.params.mode);
});

app.get("/", (req, res) => {
  console.log(req);
  console.log(res);
  const output = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>dynamic</h1>
    <li>fdfdfd</li>
    <li>fdfdfd</li>
    <li>fdfdfd</li>
    <li>fdfdfd</li>
    <li>fdfdfd</li>
    <li>fdfdfd</li>
    <li>fdfdfd</li>J
    <li>fdfdfd</li>
  </body>
  </html>
  `;
  res.send(output);
});
app.get("/route", (req, res) => {
  res.send('hello route, <img src="/005.gif"/>');
  // res.send("hello");
});
app.get("/dynamic", (req, res) => {});
app.listen(3000, () => {
  console.log("connected 3000 port");
});
