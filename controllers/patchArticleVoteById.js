const modVoteArticleById = require("../models/modVoteArticleById");

const patchArticleVoteById = (req, res) => {
  const article_id = req.params.article_id;
  const incVotes = req.body.inc_votes;

  modVoteArticleById(article_id, incVotes).then((updatedArticle) => {
    res.status(200).send({ article: updatedArticle });
  });
};

module.exports = patchArticleVoteById;
