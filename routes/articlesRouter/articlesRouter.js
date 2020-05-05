const articlesRouter = require("express").Router();
const getArticleById = require("../../controllers/getArticleById");
const patchArticleById = require("../../controllers/patchArticleById");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById);

module.exports = articlesRouter;
