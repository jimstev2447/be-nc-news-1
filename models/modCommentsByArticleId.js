const knex = require("../../be-nc-news/db/data/connection");

const modCommentsByArticleId = (
  article_id,
  sort_by = "created_at",
  order = "desc"
) => {
  console.log(article_id);
  return knex("comments")
    .where("article_id", "=", article_id)
    .orderBy(sort_by, order)
    .returning("*")
    .then((comments) => {
      console.log(comments);
    });
};

module.exports = modCommentsByArticleId;
