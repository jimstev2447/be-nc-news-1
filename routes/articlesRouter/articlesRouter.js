const articlesRouter = require("express").Router();
const getArticleById = require("../../controllers/getArticleById");
const patchArticleVoteById = require("../../controllers/patchArticleVoteById");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleVoteById);

module.exports = articlesRouter;
