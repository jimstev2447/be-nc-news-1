const knex = require("../db/data/connection.js");

const modPostCommentByArticleId = (article_id, body, username) => {
  return knex("comments")
    .insert({
      article_id: article_id,
      author: username,
      body: body,
    })
    .returning("*");
};

module.exports = modPostCommentByArticleId;
