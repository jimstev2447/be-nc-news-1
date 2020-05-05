const knex = require("../db/data/connection.js");

const modUser = () => {
  console.log("modUser is working");
  return knex
    .select("*")
    .from("topics")
    .then((allTopics) => {
      return allTopics;
    });
};

module.exports = modUser;
