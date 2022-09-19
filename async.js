const fs = require("fs");

const data = fs.readFileSync("hello.js", { encoding: "utf8" });
console.log(data);
console.log(2);

fs.readFile("hello.js", { encoding: "utf8" }, (err, data) => {
  console.log(3);
  console.log(data);
});
console.log(4);
