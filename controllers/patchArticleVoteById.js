const modVoteArticleById = require("../models/modVoteArticleById");

const patchArticleVoteById = (req, res) => {
  modVoteArticleById().then(() => {
    res.status(200).send();
  });
};

module.exports = patchArticleVoteById;
