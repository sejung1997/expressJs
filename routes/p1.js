export default p1 = (app) => {
  const express = require("express");

  const router = express.Router();
  router.get("/r1", (req, res) => {
    res.send("/p1/R1");
  });
  router.get("/r2", (req, res) => {
    res.send("/p1/R2");
  });
};
