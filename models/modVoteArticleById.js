const knex = require("../db/data/connection.js");

const modVoteArticleById = (article_id, incVotes) => {
  return knex("articles")
    .where("articles.article_id", "=", article_id)
    .increment("votes", incVotes)
    .returning("*")
    .then(([article]) => {
      console.log(article);
      return article;
    });
};

module.exports = modVoteArticleById;
