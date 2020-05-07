const modPostCommentByArticleId = require("../models/modPostCommentByArticleId");

const postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { body, username } = req.body;
  if (!article_id || !body || !username) {
    next({ status: 400, message: "bad request" });
  } else {
    modPostCommentByArticleId(article_id, body, username)
      .then((updatedComment) => {
        res.status(201).send({ comment: updatedComment });
      })
      .catch(next);
  }
};

module.exports = postCommentByArticleId;
