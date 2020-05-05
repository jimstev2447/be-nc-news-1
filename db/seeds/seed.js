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
    .then(() => {
      console.log("Successfully populated table 'articles'.");
      const updatedArticles = formatDates(articleData);
      return knex.insert(updatedArticles).into("articles").returning("*");
    })
    .then((articleRows) => {
      console.log("Successfully populated table 'comments'.");
      const articleRef = makeRefObj(articleRows);
      const formattedComments = formatComments(commentData, articleRef);
      return knex("comments").insert(formattedComments).returning("*");
    });
};
