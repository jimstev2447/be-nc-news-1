const apiRouter = require("express").Router();
const topicsRouter = require("./topicsRouter/topicsRouter");
const usersRouter = require("./usersRouter/usersRouter");
const articlesRouter = require("./articlesRouter/articlesRouter.js");
const commentsRouter = require("./commentsRouter/commentsRouter.js");

apiRouter.use("/topics", topicsRouter);

apiRouter.use("/users", usersRouter);

apiRouter.use("/articles", articlesRouter);

apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
