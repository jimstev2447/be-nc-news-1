const knex = require("../db/data/connection.js");

const modSendAllArticles = () => {
  console.log("all articles");
  return knex("articles")
    .select("articles.*")
    .count({ comment_count: "comments.article_id" })
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .then((articles) => {
      return articles;
    });
};

module.exports = modSendAllArticles;
