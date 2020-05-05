const express = require("express");
const app = express();
const apiRouter;

app.use("/api", apiRouter);

module.exports = app;
