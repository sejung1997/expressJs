const express = require("express");
const app = express();
import p1 from "./routes/p1";
import p2 from "./routes/p2";
// const p1 = require("./routes/p1")(app);
// const p2 = require("./routes/p2")(app);

app.use("/p1", p1(app));
app.use("/p2", p2(app));

router.listen(3000, () => {
  console.log("connected 3000 port");
});
