const express = require("express");
const app = express();
app.set("view engine", "jade"); // express jade 연결
app.set("views", "./views");
app.locals.pretty = true;
app.use(express.static("public"));
app.get("/template", (req, res) => {
  res.render("temp", { time: "hello" }); // views 폴더 안에 temp라는 파일 찾음
});
app.get("/", (req, res) => {
  console.log(req);
  console.log(res);
  res.send("hello");
});
app.get("/route", (req, res) => {
  res.send('hello route, <img src="/005.gif"/>');
  // res.send("hello");
});
app.get("/dynamic", (req, res) => {
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
    <li>fdfdfd</li>
    <li>fdfdfd</li>
  </body>
  </html>
  `;
  res.send(output);
});
app.listen(3000, () => {
  console.log("connected 3000 port");
});
