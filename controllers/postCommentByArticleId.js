const modPostCommentByArticleId = require("../models/modPostCommentByArticleId");

const postCommentByArticleId = (req, res) => {
  const { article_id } = req.params;
  const { body, username } = req.body;

  modPostCommentByArticleId(article_id, body, username).then(
    (updatedComment) => {
      res.send({ comment: updatedComment });
    }
  );
};

module.exports = postCommentByArticleId;
