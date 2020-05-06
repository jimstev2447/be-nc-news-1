const knex = require("../../be-nc-news/db/data/connection");

const modCommentsByArticleId = (
  article_id,
  sort_by = "created_at",
  order = "desc"
) => {
  return knex("comments")
    .where("article_id", "=", article_id)
    .orderBy(sort_by, order)
    .returning("*")
    .then((comments) => {
      return comments;
    });
};

module.exports = modCommentsByArticleId;
