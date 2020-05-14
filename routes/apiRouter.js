const apiRouter = require("express").Router();
const topicsRouter = require("./topicsRouter/topicsRouter");
const usersRouter = require("./usersRouter/usersRouter");
const articlesRouter = require("./articlesRouter/articlesRouter.js");
const commentsRouter = require("./commentsRouter/commentsRouter.js");
const error405Handler = require("../errorHandlers/error405Handler");

apiRouter.use("/topics", topicsRouter).all(error405Handler);

apiRouter.use("/users", usersRouter).all(error405Handler);

apiRouter.use("/articles", articlesRouter).all(error405Handler);

apiRouter.use("/comments", commentsRouter).all(error405Handler);

apiRouter
  .get("/", (req, res, next) => {
    res.send({
      "GET /api": {
        description:
          "serves up a json representation of all the available endpoints of the api",
      },
      "GET /api/topics": {
        description: "serves an array of all topics",
        queries: [],
        exampleResponse: {
          topics: [{ slug: "football", description: "Footie!" }],
        },
      },
      "GET /api/articles": {
        description: "serves an array of all topics",
        queries: ["author", "topic", "sort_by", "order"],
        exampleResponse: {
          articles: [
            {
              title: "Seafood substitutions are increasing",
              topic: "cooking",
              author: "weegembump",
              body: "Text from the article..",
              created_at: 1527695953341,
            },
          ],
        },
      },
    });
  })
  .all(error405Handler);

module.exports = apiRouter;
