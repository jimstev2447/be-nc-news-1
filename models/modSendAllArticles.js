const knex = require("../db/data/connection.js");

const modSendAllArticles = () => {
  return knex("articles")
    .select("articles.*")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .count({ comment_count: "comments.article_id" })
    .groupBy("articles.article_id")
    .orderBy("created_at", "desc")
    .then((articles) => {
      return articles;
    });
};

module.exports = modSendAllArticles;
