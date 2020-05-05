const knex = require("../db/data/connection.js");

const modAllTopics = () => {
  return knex
    .select("*")
    .from("topics")
    .then((allTopics) => {
      return allTopics;
    });
};

module.exports = modAllTopics;
