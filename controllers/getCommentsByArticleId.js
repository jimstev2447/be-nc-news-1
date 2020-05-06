const modCommentsByArticleId = require("../models/modCommentsByArticleId");

const getCommentsByArticleId = (req, res) => {
  const article_id = req.params["article_id"];
  const sort_by = req.query["sort_by"];
  const order = req.query.order;
  modCommentsByArticleId(article_id, sort_by, order).then((comments) => {
    res.status(200).send(comments);
  });
};

module.exports = getCommentsByArticleId;
