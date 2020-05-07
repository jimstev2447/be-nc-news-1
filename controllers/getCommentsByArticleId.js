const modCommentsByArticleId = require("../models/modCommentsByArticleId");

const getCommentsByArticleId = (req, res, next) => {
  const article_id = req.params["article_id"];
  const sort_by = req.query["sort_by"];
  const order = req.query.order;
  if (typeof parseInt(article_id) !== "number") {
    next({ status: 400, message: "bad request" });
  } else {
    modCommentsByArticleId(article_id, sort_by, order)
      .then((comments) => {
        res.status(200).send({ comments });
      })
      .catch(next);
  }
};

module.exports = getCommentsByArticleId;
