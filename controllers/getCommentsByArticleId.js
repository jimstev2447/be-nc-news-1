const modCommentsByArticleId = require("../models/modCommentsByArticleId");

const getCommentsByArticleId = (req, res) => {
  const article_id = req.params["article_id"];
  console.log(article_id);
  modCommentsByArticleId(article_id);
};

module.exports = getCommentsByArticleId;
