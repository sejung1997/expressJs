const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-store")(session);
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "ajsdlkfasjdfkasdasdasdc",
    resave: true,
    saveUninitialized: true,
    // session에서 사용하는 mysql 설정
    store: new MySQLStore({
      host: "localhost",
      port: 3300,
      user: "root",
      password: "111111",
      database: "o2",
    }),
  })
);
app.get("/count", (req, res) => {
  req.session.count ? req.session.count++ : (req.session.count = 1);
  res.send("count :" + req.session.count);
});
app.get("/auth/logout", (req, res) => {
  delete req.session.displayName;
  res.redirect("/welcome");
});
app.get("/welcome", (req, res) => {
  if (req.session.displayName) {
    res.send(`
      <h1>Hello, ${req.session.displayName}</h1>
      <a href="/auth/logout">logout</a>
    `);
  } else {
    res.send(`
      <h1>welcome</h1>
      <a href="/auth/login">login</a>
    `);
  }
});
app.post("/auth/login", (req, res) => {
  const user = {
    userName: "egoing",
    password: "111",
    displayName: "Egoing",
  };
  const name = req.body.userName;
  const pwd = req.body.password;
  if (name === user.userName && pwd === user.password) {
    req.session.displayName = user.displayName;
    res.redirect("/welcome");
  } else res.send("who are you? <a href='/auth/login'>login</a>");
});
app.get("/auth/login", (req, res) => {
  const output = `
    <h1>Login</h1>
    <form action="/auth/login" method="post">
      <p>
        <input type="text" name="userName" placeholder="userName"/>
      </p>
      <p>
        <input type="password" name="password" placeholder="password"/>
      </p>
      <p>
        <input type="submit"/>
      </p>
      
    </form>
  `;
  res.send(output);
});
app.listen(3000, () => {
  console.log("connected 3000 port");
});
