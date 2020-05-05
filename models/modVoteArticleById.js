const knex = require("../db/data/connection.js");

const modVoteArticleById = () => {
  return knex("articles")
    .select("articles.*")
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", "=", `${article_id}`)
    .then(([article]) => {
      return article;
    });
};

module.exports = modVoteArticleById;
