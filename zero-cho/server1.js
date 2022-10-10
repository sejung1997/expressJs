const http = require("http");
const fs = require("fs").promise;
const server = http
  .createServer(async (req, res) => {
    // 사파리에서 <h1> 태그 읽을수 있게, 한글 읽을 수 있게
    try {
      res.writeHead(200, { "content-type": "text/html", charset: "utf8" });
      // res.write("<h1> hello node </h1>");
      // res.write("<h1> server</h1>");
      const data = await fs.readFile("./server2.html");
      res.end(data);
    } catch (error) {
      res.writeHead(200, { "content-type": "text/html", charset: "utf8" });
      res.end(error.message);
    }
  })
  .listen(8080); // 80쓰면 생략 가능

server.on("listening", () => {
  console.log("port on");
});
server.on("error", (error) => {
  console.log(error);
});
