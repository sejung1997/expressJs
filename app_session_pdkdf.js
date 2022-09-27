const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const bodyParser = require("body-parser");
const bkfd2Password = require("pbkdf2-password");
const hasher = bkfd2Password();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "ajsdlkfasjdfkasdasdasdc",
    resave: true,
    saveUninitialized: true,
    store: new FileStore(),
  })
);
app.get("/count", (req, res) => {
  req.session.count ? req.session.count++ : (req.session.count = 1);
  res.send("count :" + req.session.count);
});
app.get("/auth/logout", (req, res) => {
  delete req.session.displayName;
  req.session.save(() => {
    res.redirect("/welcome");
  });
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
    password:
      "01ecb5368d8b61fd4861ad8a32e0a75cd3a3a44e90cadbcebf3bb22c20e6cede",
    salt: "@!#!@$",
    displayName: "Egoing",
  };
  const name = req.body.userName;
  const pwd = req.body.password;
  if (name === user.userName && sha256(pwd + user.salt) === user.password) {
    req.session.displayName = user.displayName;
    req.session.save(() => {
      res.redirect("/welcome");
    });
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
