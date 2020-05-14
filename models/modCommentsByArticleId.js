const knex = require("../../be-nc-news/db/data/connection");

const modCommentsByArticleId = (
  article_id,
  sort_by = "created_at",
  order = "desc"
) => {
  return knex("comments")
    .where("article_id", "=", article_id)
    .orderBy(sort_by, order)
    .select("*")
    .then((comments) => {
      return comments;
      // if (comments.length !== 0) {
      //   return comments;
      // } else {
      //   return Promise.reject({
      //     status: 404,
      //     message: "The request resource or route was not found.",
      //   });
      // }
    });
};

module.exports = modCommentsByArticleId;
