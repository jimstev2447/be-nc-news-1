const knex = require("../db/data/connection.js");

const modVoteArticleById = (article_id, incVotes) => {
  return knex("articles")
    .increment("votes", incVotes || 0)
    .where("articles.article_id", "=", article_id)
    .returning("*")
    .then(([article]) => {
      return article;
    });
};

module.exports = modVoteArticleById;
