const OrientDB = require("orientjs");

const server = OrientDB({
  host: "localhost",
  port: 2480,
  user: "root",
  password: 111,
});

const db = server.use("o2");
// db.record.get("#12:1").then((record) => {
//   console.log(record, "record");
// });

// const sql = "SELECT FROM topics";
// db.query(sql).then((results) => {
//   console.log(results);
// });
// const sql = "SELECT FROM topics WHERE @rid=:rid";
// const param = {
//   params: { rid: "#34:0" },
// };
// db.query(sql, param).then((results) => {
//   console.log(results);
// });
// const sql = "INSERT INTO topics (title, description) VALUES(;title,:desc)";
// const param = {
//   params: {
//     title: "express",
//     desc: "express is...",
//   },
// };
// db.query(sql, param).then((results) => {
//   console.log(results);
// });
// const sql = "UPDATE topic SET title=:title WHERE @rid=:rid";

// const param = {
//   params: {
//     title: "express",
//     rid: "#34:0",
//   },
// };
// db.query(sql, param).then((results) => {
//   console.log(results);
// });
const sql = "DELETE FROM topic WHERE @rid=:rid";

const param = {
  params: {
    title: "express",
    rid: "#34:0",
  },
};
db.query(sql, param).then((results) => {
  console.log(results);
});
