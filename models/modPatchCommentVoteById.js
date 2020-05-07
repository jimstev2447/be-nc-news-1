const knex = require("../db/data/connection.js");

const modPatchCommentVoteById = (comment_id, incVotes) => {
  return knex("comments")
    .increment("votes", incVotes)
    .where("comments.comment_id", "=", comment_id)
    .returning("*")
    .then(([comment]) => {
      return comment;
    });
};

module.exports = modPatchCommentVoteById;
