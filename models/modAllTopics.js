const knex = require("../db/data/connection.js");

const modAllTopics = () => {
  return knex
    .select("*")
    .from("topics")
    .then((allTopics) => {
      if (!allTopics) {
        return Promise.reject({ status: 404, message: "Topics not found." });
      } else {
        return allTopics;
      }
    });
};

module.exports = modAllTopics;
