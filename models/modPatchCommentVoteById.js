const knex = require("../db/data/connection.js");

const modPatchCommentVoteById = (comment_id, incVotes = 0) => {
  return knex("comments")
    .increment("votes", incVotes)
    .where("comments.comment_id", "=", comment_id)
    .returning("*")
    .then((comments) => {
      if (comments.length === 0) {
        return Promise.reject({
          status: 404,
          message: "Resource or path not found.",
        });
      } else {
        return comments[0];
      }
    });
};

module.exports = modPatchCommentVoteById;
