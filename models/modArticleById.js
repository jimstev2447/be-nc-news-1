const knex = require("../db/data/connection.js");

const modArticlerById = (article_id) => {
  return knex
    .select("articles.*")
    .count({ comment_count: "comment_id" })
    .from("articles")
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", "=", `${article_id}`)
    .then(([article]) => {
      return article;
    });
};

module.exports = modArticlerById;
