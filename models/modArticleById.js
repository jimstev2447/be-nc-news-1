const knex = require("../db/data/connection.js");

const modArticlerById = (article_id) => {
  return knex
    .select("*")
    .from("users")
    .where("users.username", "=", `${username}`)
    .then(([user]) => {
      return user;
    });
};

module.exports = modArticlerById;
