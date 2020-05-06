const knex = require("../db/data/connection.js");

const modAllTopics = () => {
  return knex
    .select("*")
    .from("topics")
    .then((allTopics) => {
      if (err) {
        return Promise.reject({ status: 404, message: "Topics not found." });
      }
    });
};

module.exports = modAllTopics;
