const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const bodyParser = require("body-parser");
const bkfd2Password = require("pbkdf2-password");
const hasher = bkfd2Password();
const mysql = require("mysql");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3300,
  password: "111111",
  database: "o2",
});
conn.connect();
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
app.post("/auth/register", (req, res) => {
  return hasher({ password: req.body.password }, (err, pass, salt, hash) => {
    const user = {
      username: req.body.userName,
      password: hash,
      salt: salt,
      displayName: req.body.displayName,
      authId: req.body.displayName,
    };
    // res.send(user);
    // res.send(user);
    // const sql = "SELECT * FROM users";
    const sql = "INSERT INTO users SET ?";
    // const sql =
    //   "INSERT INTO users SET authId='12',username='21',salt='31',displayName='42'?";
    // const sql =
    //   "INSERT INTO users (authId,username,password,salt,displayName) VALUES('r5','r5', 'r5','r5','r5')";
    conn.query(sql, user, (err, result) => {
      if (err) {
        res.render(err);
        res.status(500).send("internal server error");
        return;
      }
      req.session.displayName = user.displayName;
      res.redirect("/welcome");
    });
  });
});
app.post("/auth/login", (req, res) => {
  const name = req.body.userName;
  const pwd = req.body.password;

  const sql = "SELECT * FROM users WHERE username=?";
  conn.query(sql, name, (err, results) => {
    if (err) {
      res.status(500).send("internal server error");
    }
    return hasher(
      { password: pwd, salt: results[0]?.salt },
      (err, pass, salt, hash) => {
        if (hash === results[0]?.password) {
          req.session.displayName = results[0]?.displayName;
        }
        res.redirect("/welcome");
      }
    );
  });
  // if (name === user.userName && pwd === user.password) {
  //   req.session.displayName = user.displayName;
  //   res.redirect("/welcome");
  // } else res.send("who are you? <a href='/auth/login'>login</a>");
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
app.get("/auth/register", (req, res) => {
  const output = `
    <h1>register</h1>
    <form action="/auth/register" method="post">
      <p>
        <input type="text" name="userName" placeholder="userName"/>
      </p>
      <p>
        <input type="password" name="password" placeholder="password"/>
      </p>
      <p>
        <input type="text" name="displayName" placeholder="displayName"/>
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
