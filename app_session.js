const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const app = express();
app.use(
  session({
    secret: "ajsdlkfasjdfkasdasdasdc",
    resave: true,
    saveUninitialized: true,
  })
);
app.get("/count", (req, res) => {
  req.session.count ? req.session.count++ : (req.session.count = 1);
  res.send("count :" + req.session.count);
});
app.post("/auth/post", (req, res) => {
  const user = {
    userName: "egoing",
    password: "111",
  };
  const name = req.body.userName;
  const pwd = req.body.password;
  if (name === user.userName && pwd === user.password) {
    res.send("");
  } else res.send("who are you? <a href='/auth/login'>login</a>");
});
app.get("auth/login", (req, res) => {
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
  send(output);
});
app.listen(3000, () => {
  console.log("connected 3000 port");
});
