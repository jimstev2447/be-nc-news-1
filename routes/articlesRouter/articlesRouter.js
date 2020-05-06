const articlesRouter = require("express").Router();
const getArticleById = require("../../controllers/getArticleById");
const patchArticleVoteById = require("../../controllers/patchArticleVoteById");
const getCommentsByArticleId = require("../../controllers/getCommentsByArticleId");
const getAllArticles = require("../../controllers/getAllArticles.js");

articlesRouter.route("/").get(getAllArticles);
articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleVoteById);
articlesRouter.route("/:article_id/comments").get(getCommentsByArticleId);

module.exports = articlesRouter;
