const knex = require("../db/data/connection.js");

const modArticleById = (article_id) => {
  return knex("articles")
    .select("articles.*")
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .where("articles.article_id", "=", `${article_id}`)
    .groupBy("articles.article_id")
    .then((articles) => {
      if (articles.length !== 0) {
        return articles[0];
      } else {
        console.log("testing");
        return Promise.reject({ status: 404, message: "article not found" });
      }
    });
};

module.exports = modArticleById;
