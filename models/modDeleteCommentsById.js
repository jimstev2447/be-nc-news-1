const knex = require("../db/data/connection.js");

const modDeleteCommentsById = (comment_id) => {
  return knex("comments").where({ comment_id }).del();
};

module.exports = modDeleteCommentsById;
