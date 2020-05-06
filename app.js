const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter.js");
const error404Handler = require("./errorHandlers/error404.js");

app.use(express.json());

app.use("/api", apiRouter);

app.use(error404Handler);

app.use((err, req, res, next) => {
  if (err.status) res.status(err.status).send({ message: err.message });
  else next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: "Server error" });
});

module.exports = app;
