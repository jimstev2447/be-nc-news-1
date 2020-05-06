const modPostCommentByArticleId = require("../models/modPostCommentByArticleId");

const postCommentByArticleId = (req, res) => {
  modPostCommentByArticleId().then(() => {
    res.send();
  });
};

module.exports = postCommentByArticleId;
