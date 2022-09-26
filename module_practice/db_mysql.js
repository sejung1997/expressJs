const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3300",
  password: "111111",
  database: "o2",
});
conn.connect();
// const sql = "SELECT * FROM topic";
// conn.query(sql, (err, rows, fields) => {
//   if (err) console.error(err);
//   else {
//     // console.log(rows, fields, "results");
//     for (let i = 0; i < rows.length; i++) {
//       console.log(rows[i].author);
//     }
//   }
// });
// const sql = "INSERT INTO topic (title, description, author) VALUES(?,?,? )";
// const params = ["supervisor", "watcher", "grapth"];
// conn.query(sql, params, (err, rows, fields) => {
//   if (err) console.error(err);
//   else {
//     console.log(rows);
//   }
// });
// const sql = "UPDATE topic SET title=?, description=?, author=? WHERE id=?";
// const params = ["npms", "npms is...", "leezche", 3];
// conn.query(sql, params, (err, rows, fields) => {
//   if (err) console.error(err);
//   else {
//     console.log(rows);
//   }
// });
const sql = "DELETE FROM topic WHERE id=?";
const params = [1];
conn.query(sql, params, (err, rows, fields) => {
  if (err) console.error(err);
  else {
    console.log(rows);
  }
});
conn.end();
