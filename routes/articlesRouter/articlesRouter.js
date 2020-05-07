const articlesRouter = require("express").Router();
const getArticleById = require("../../controllers/getArticleById");
const patchArticleVoteById = require("../../controllers/patchArticleVoteById");
const getCommentsByArticleId = require("../../controllers/getCommentsByArticleId");
const getAllArticles = require("../../controllers/getAllArticles.js");
const postCommentByArticleId = require("../../controllers/postCommentByArticleId");
const error405Handler = require("../../errorHandlers/error405Handler");

articlesRouter.route("/").get(getAllArticles).all(error405Handler);
articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleVoteById)
  .all(error405Handler);
articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId)
  .all(error405Handler);

module.exports = articlesRouter;
