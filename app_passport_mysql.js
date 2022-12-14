const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const bodyParser = require("body-parser");
const bkfd2Password = require("pbkdf2-password");
const hasher = bkfd2Password();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3300,
  password: "111111",
  database: "o2",
});
conn.connect();
// mvc
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "ajsdlkfasjdfkasdasdasdc",
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
      host: "localhost",
      port: 3300,
      user: "root",
      password: "111111",
      database: "o2",
    }),
  })
);

// local 전략
// session을 사용하기 위한 코드 app.use(session) 뒤에 있어야함
// passport 등록
app.use(passport.initialize());
app.use(passport.session());
app.set("views", "./views/mysql");
app.set("view engine", "jade");
app.get("/count", (req, res) => {
  req.session.count ? req.session.count++ : (req.session.count = 1);
  res.send("count :" + req.session.count);
});

app.post("/register", (req, res) => {
  // res.send(req.body.username + req.body.password + req.body.displayName);
  return hasher({ password: req.body.password }, (err, pass, salt, hash) => {
    const user = {
      username: req.body.username,
      password: hash,
      salt: salt,
      displayName: req.body.displayName,
      authId: req.body.displayName,
    };
    // res.send(user);
    // const sql = "SELECT * FROM users";
    const sql = "INSERT INTO users SET ?";
    // const sql =
    //   "INSERT INTO users SET authId='12',username='21',salt='31',displayName='42'?";
    // const sql =
    //   "INSERT INTO users (authId,username,password,salt,displayName) VALUES('r2','r2', 'r2','r2','r2')";
    conn.query(sql, user, (err, result) => {
      if (err) {
        res.render(err);
        res.status(500).send("internal server error");
        return;
      }
      console.log(user);
      // res.send(result);
      //   req.session.save(() => {
      //     res.redirect("/welcome");
      // });
      req.login(user, (err) => {
        return res.redirect("/welcome");
      });
    });
  });
});
// connection pull
app.get("/welcome", (req, res) => {
  // passport에 의해  req.user가 생성됨
  // res.send(req);
  // if (req.user && req.user.displayName) {
  //   res.send(`
  //     <h1>Hello, ${req.session.displayName}</h1>
  //     <a href="/auth/logout">logout</a>
  //   `);
  // } else {
  //   res.send(`
  //     <h1>welcome</h1>
  //     <a href="/auth/login">login</a>
  //   `);
  // }
});

// done() 의 첫번째 인자가 user로 전달
passport.serializeUser((user, done) => {
  //user.userName이 세센에 저장

  done(null, user.authId);
});
passport.deserializeUser((id, done) => {
  // 사용자가 다시 방문할때마다 userName을 검색해서user.userName이 ID로 전달됨
  const sql = "SELECT * FROM users WHERE authId=?";
  conn.query(sql, [id], (err, results) => {
    if (err) done("There is no user");
    else done(null, results)[0];
  });
  // for (let i = 0; i < userList.length; i++) {
  //   const user = userList[i];
  //   if (user.userName === id) return done(null, user);
  // }
});
// 새로운 로컬 로그인 전략을 등록함
passport.use(
  new LocalStrategy((username, password, done) => {
    const name = username;
    const pwd = password;
    const sql = "SELECT * FROM users WHERE authId=?";
    conn.query(sql, ["local:" + name], (err, results) => {
      if (err) return done("There is no user.");
      const user = results[0];
      return hasher(
        { password: pwd, salt: user.salt },
        (err, pass, salt, hash) => {
          if (hash === user.password) {
            done(null, user);
          } else done(null, false);
        }
      );
    });
    // for (let i = 0; i < userList.length; i++) {
    //   const user = userList[i];
    //   if (name === user.userName) {
    //     return hasher(
    //       { password: pwd, salt: user.salt },
    //       (err, pass, salt, hash) => {
    //         // 성공시 user 정보 전달
    //         if (hash === user.password) done(null, user);
    //         else done(null, false);
    //       }
    //     );
    //   }
    // }
    // done(null, false);
  })
);
const auth = require("./routes/mysql/auth")(passport);
app.use("/auth/", auth);
app.listen(3000, () => {
  console.log("connected 3000 port");
});
