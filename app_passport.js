const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const bodyParser = require("body-parser");
const bkfd2Password = require("pbkdf2-password");
const hasher = bkfd2Password();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
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
// session을 사용하기 위한 코드 app.use(session) 뒤에 있어야함
app.use(passport.session());
app.use(passport.initialize());
app.get("/count", (req, res) => {
  req.session.count ? req.session.count++ : (req.session.count = 1);
  res.send("count :" + req.session.count);
});
app.get("/auth/logout", (req, res) => {
  // passport가 로그아웃 해줌
  req.logout();
  req.session.save(() => {
    res.redirect("/welcome");
  });
});
app.post("/auth/register", () => {
  hasher({ password: req.body.password }, (err, pass, salt, hash) => {
    const user = {
      username: req / body.username,
      password: hash,
      salt: salt,
      displayName: req.body.displayName,
    };
    userList.push(user);
    req.login(user, (err) => {
      req.session.save(() => {
        res.redirect("/welcome");
      });
    });
  });
});
app.get("/welcome", (req, res) => {
  // passport의 user
  if (req.user && req.user.displayName) {
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
const userList = [
  {
    userName: "egoing",
    password:
      "01ecb5368d8b61fd4861ad8a32e0a75cd3a3a44e90cadbcebf3bb22c20e6cede",
    salt: "@!#!@$",
    displayName: "Egoing",
  },
];
passport.serializeUser((user, done) => {
  //user.userName이 세센에 저장

  done(null, user.userName);
});
passport.deserializeUser((id, done) => {
  // 사용자가 다시 방문할때마다 userName을 검색해서
  for (let i = 0; i < userList.length; i++) {
    const user = userList[i];
    if (user.userName === id) return done(null, user);
  }
});
// 새로운 로컬 로그인 전략을 등록함
passport.use(
  new LocalStrategy((username, password, done) => {
    const name = username;
    const pwd = password;
    for (let i = 0; i < userList.length; i++) {
      const user = userList[i];
      if (name === user.userName) {
        return hasher(
          { password: pwd, salt: user.salt },
          (err, pass, salt, hash) => {
            if (hash === user.password) done(null, user);
            else done(null, false);
          }
        );
      }
    }
    done(null, false);
  })
);
app.post(
  "/auth/login",
  passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/auth/login",
    failureFlash: false,
  })
);
// app.post("/auth/login", (req, res) => {
// const userList = [
//   {
//     userName: "egoing",
//     password:
//       "01ecb5368d8b61fd4861ad8a32e0a75cd3a3a44e90cadbcebf3bb22c20e6cede",
//     salt: "@!#!@$",
//     displayName: "Egoing",
//   },
// ];
// const name = req.body.userName;
// const pwd = req.body.password;
// for (let i = 0; i < userList.length; i++) {
//   const user = userList[i];
//   if (name === user.userName) {
//     return hasher(
//       { password: pwd, salt: user.salt },
//       (err, pass, salt, hash) => {
//         if (hash === user.password) {
//           req.session.displayName = user.displayName;
//           req.session.save(() => {
//             res.redirect("/welcome");
//           });
//         } else {
//           res.send("who are you? <a href='/auth/login'>login</a>");
//         }
//       }
//     );
//   } else {
//     res.send("who are you? <a href='/auth/login'>login</a>");
//   }
// }
// if (name === user.userName && sha256(pwd + user.salt) === user.password) {
//   req.session.displayName = user.displayName;
//   req.session.save(() => {
//     res.redirect("/welcome");
//   });
// }
//   res.send("who are you? <a href='/auth/login'>login</a>");
// });
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
