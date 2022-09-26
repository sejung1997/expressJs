const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(
  cookieParser(
    "ajsdflkajsdlkfjasldjflkajsdljaslfjalksdjflksajdlkfajsdjfalksdjfalksjdflkajsdljasdlkfjalksdjflksdjf"
  )
);
const products = {
  1: { title: "the history of web1" },
  2: { title: "the next web" },
};
app.get("/products", (req, res) => {
  let output = "";
  for (const name in products) {
    output += `<li><a href="/cart/${name}">${products[name].title}</a></li>`;
  }
  res.send(`<h1>product</h1><ul>${output}</ul><a href="/cart">cart</a>`);
});
app.get("/cart/:id", (req, res) => {
  const id = req.params.id;
  if (req.signedCookies.cart) {
    var cart = req.signedCookies.cart;
  } else {
    var cart = {};
  }
  if (!cart[id]) cart[id] = 0;
  cart[id] = parseInt(cart[id]) + 1;
  res.cookie("cart", cart, { signed: true });
  res.send(cart);
  res.redirect("/cart");
});
app.get("/cart", (req, res) => {
  const cart = req.signedCookies.cart;
  if (!cart) return res.send("empty");
  var output = "";
  for (let id in cart) {
    output += `<li>${products[id].title} (${cart[id]}) </li>`;
  }
  res.send(`<ul>${output}</ul><a href="/products">products list</a>`);
});

app.get("/count", (req, res) => {
  res.cookie("count", 1);
  res.send("count: " + req.cookies.count);
  if (req.signedCookies.count) {
    var count = parseInt(req.signedCookies.count);
  } else {
    var count = 0;
  }
  count = count + 1;
  res.cookie("count", count, { signed: true });
  res.send("count: " + count);
});
app.listen(3000, () => {
  console.log("connected 3000 port");
});
