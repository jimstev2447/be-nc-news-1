const apiRouter = require("express").Router();
const topicsRouter = require("./topicsRouter/topicsRouter");
const usersRouter = require("./usersRouter/usersRouter");
const articlesRouter = require("./articlesRouter/articlesRouter.js");
const commentsRouter = require("./commentsRouter/commentsRouter.js");
const error405Handler = require("../errorHandlers/error405Handler");

apiRouter.use("/topics", topicsRouter);

apiRouter.use("/users", usersRouter);

apiRouter.use("/articles", articlesRouter);

apiRouter.use("/comments", commentsRouter);

apiRouter
  .route("/")
  .get((req, res, next) => {
    res.send({
      "GET /api": {
        description:
          "Displays the available endpoints of the API to the server.",
      },
      "GET /api/topics": {
        description: "Sends an array of all the topics to the user",
        queries: [],
        exampleResponse: {
          topics: [{ slug: "football", description: "Footie!" }],
        },
      },
      "GET /api/articles": {
        description: "Sends an array of articles to the user.",
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
      "GET /api/articles/:article_id/comments": {
        description: "Sends an array of comments for the given article.",
        queries: ["sort_by", "order"],
        exampleResponse: {
          comments: [
            {
              comment_id: 2,
              author: "butter_bridge",
              article_id: 1,
              votes: 14,
              created_at: "2016-11-22T12:36:03.389Z",
              body:
                "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
            },
          ],
        },
      },
      "GET /api/users/:username": {
        description: "Sends the requested user according to username.",
        exampleResponse: {
          user: {
            username: "rogersop",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
            name: "paul",
          },
        },
      },
      "PATCH /api/articles/:article_id": {
        description: "Patches the number of votes on an article.",
        examplePatch: { inc_votes: 1 },
        exampleUpdate: {
          article: {
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 110,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2018-11-15T12:21:54.171Z",
          },
        },
      },
      "PATCH /api/comments/:comment_id": {
        description: "Patches the number of votes on a comment.",
        examplePatch: { inc_votes: 1 },
        exampleUpdate: {
          comment: {
            comment_id: 1,
            author: "butter_bridge",
            article_id: 9,
            votes: 26,
            created_at: "2017-11-22T12:36:03.389Z",
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          },
        },
      },
      "POST /api/articles/:article_id/comments": {
        description: "Posts a new comment.",
        examplePost: {
          body: "This works!",
          username: "butter_bridge",
        },
        exampleNewComment: {
          comment: {
            comment_id: 19,
            author: "butter_bridge",
            article_id: 9,
            votes: 0,
            created_at: "2020-05-24T10:19:29.160Z",
            body: "This works!",
          },
        },
      },
      "DELETE /api/comments/:comment_id": {
        description: "Deletes a comment using the comment ID.",
      },
    });
  })
  .all(error405Handler);

module.exports = apiRouter;
