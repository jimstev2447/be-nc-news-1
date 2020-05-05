const articlesRouter = require("express").Router();
const getArticleById = require("../../controllers/getArticleById");
// const patchArticleVoteById = require("../../controllers/patchArticleVoteById");
const getCommentsByArticleId = require("../../controllers/getCommentsByArticleId");

articlesRouter.route("/:article_id").get(getArticleById);
articlesRouter.route("/:article_id/comments").get(getCommentsByArticleId);
// .patch(patchArticleVoteById);

module.exports = articlesRouter;
