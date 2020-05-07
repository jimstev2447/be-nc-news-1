const modVoteArticleById = require("../models/modVoteArticleById");

const patchArticleVoteById = (req, res, next) => {
  const article_id = req.params.article_id;
  const incVotes = req.body.inc_votes;
  if (
    !article_id ||
    typeof parseInt(article_id) !== "number" ||
    typeof parseInt(incVotes) !== "number"
  ) {
    next({ status: 400, message: "bad request" });
  } else {
    modVoteArticleById(article_id, incVotes)
      .then((updatedArticle) => {
        const status = incVotes ? 201 : 200;
        res.status(status).send({ article: updatedArticle });
      })
      .catch(next);
  }
};

module.exports = patchArticleVoteById;
