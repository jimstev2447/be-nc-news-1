const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter.js");
const error404Handler = require("./errorHandlers/error404Handler.js");
const error405Handler = require("./errorHandlers/error405Handler");
const error505Handler = require("./errorHandlers/error505Handler");
const errorCustomHandler = require("./errorHandlers/errorCustomHandler");

app.use(express.json());

app.use("/api", apiRouter);

app.use(error404Handler);

app.use(error405Handler);

app.use(errorCustomHandler);

app.use(error505Handler);

module.exports = app;
