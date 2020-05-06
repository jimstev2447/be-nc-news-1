const knex = require("../db/data/connection.js");

const modDeleteCommentsById = (comment_id) => {
  return knex("comments")
    .where({ comment_id })
    .del()
    .then((delCount) => {
      if (delCount === 1) {
        return Promise.reject({ status: 404, message: "Comment not found." });
      }
    });
};

module.exports = modDeleteCommentsById;
