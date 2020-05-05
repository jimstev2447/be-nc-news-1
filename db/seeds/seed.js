const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/data-index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const topicsInsertions = knex("topics").insert(topicData).returning("*");
      console.log("Successfully populated table 'topics'.");
      const usersInsertions = knex("users").insert(userData).returning("*");
      console.log("Successfully populated table 'users'.");
      return Promise.all([topicsInsertions, usersInsertions]);
    })
    .then((data) => {
      console.log("Successfully populated table 'articles'.");
      return knex("articles").insert(formatDates(articleData)).returning("*");
    })
    .then((articleRows) => {
      console.log("Successfully populated table 'comments'.");
      const articleRef = makeRefObj(articleRows);
      const formattedComments = formatComments(commentData, articleRef);
      return knex("comments").insert(formattedComments).returning("*");
    });
};
