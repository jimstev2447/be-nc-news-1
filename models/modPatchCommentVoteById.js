const knex = require("../db/data/connection.js");

const modPatchCommentVoteById = (comment_id, incVotes) => {
  return knex("comments")
    .where("comments.comment_id", "=", comment_id)
    .increment("votes", incVotes)
    .returning("*")
    .then(([comment]) => {
      return comment;
    });
};

module.exports = modPatchCommentVoteById;
