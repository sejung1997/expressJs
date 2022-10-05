module.exports = (passport) => {
  var route = require("express").Router();

  route.post("/auth/login", (req, res) => {
    const userList = [
      {
        userName: "egoing",
        password:
          "01ecb5368d8b61fd4861ad8a32e0a75cd3a3a44e90cadbcebf3bb22c20e6cede",
        salt: "@!#!@$",
        displayName: "Egoing",
      },
    ];
    const name = req.body.userName;
    const pwd = req.body.password;
    for (let i = 0; i < userList.length; i++) {
      const user = userList[i];
      if (name === user.userName) {
        return hasher(
          { password: pwd, salt: user.salt },
          (err, pass, salt, hash) => {
            if (hash === user.password) {
              req.session.displayName = user.displayName;
              req.session.save(() => {
                res.redirect("/welcome");
              });
            } else {
              res.send("who are you? <a href='/auth/login'>login</a>");
            }
          }
        );
      } else {
        res.send("who are you? <a href='/auth/login'>login</a>");
      }
    }
    if (name === user.userName && sha256(pwd + user.salt) === user.password) {
      req.session.displayName = user.displayName;
      req.session.save(() => {
        res.redirect("/welcome");
      });
    }
    res.send("who are you? <a href='/auth/login'>login</a>");
  });

  route.post(
    "/auth/login",
    passport.authenticate("local", {
      // 성공시
      successRedirect: "/welcome",
      failureRedirect: "/auth/login",
      failureFlash: false,
    })
  );
  route.get("/auth/login", (req, res) => {
    res.render("auth/login");
  });
  route.get("/auth/register", (req, res) => {
    res.render("auth/register");
  });
  route.get("/logout", (req, res) => {
    // passport가 로그아웃 해줌
    req.logout();
    req.session.save(() => {
      res.redirect("/welcome");
    });
  });
  return route;
};
