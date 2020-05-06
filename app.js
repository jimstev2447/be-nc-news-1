const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter.js");
const error404Handler = require("./errorHandlers/error404Handler.js");
const error505Handler = require("./errorHandlers/error505Handler");

app.use(express.json());

app.use("/api", apiRouter);

app.use(error404Handler);

app.use((err, req, res, next) => {
  if (err.status) res.status(err.status).send({ message: err.message });
  else next(err);
});

app.use(error505Handler);

module.exports = app;
