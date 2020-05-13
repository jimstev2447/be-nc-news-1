const knex = require("../../be-nc-news/db/data/connection");

const modCommentsByArticleId = (
  article_id,
  sort_by = "created_at",
  order = "desc"
) => {
  return knex("comments")
    .where("article_id", "=", article_id)
    .orderBy(sort_by, order);
  // .select("*")
  // .then((comments) => {
  //   console.log(comments[0]);
  //   return comments;
  // })
};

module.exports = modCommentsByArticleId;
