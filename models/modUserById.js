const knex = require("../db/data/connection.js");

const modUserById = (username) => {
  return knex
    .select("*")
    .from("users")
    .where("users.username", "=", `${username}`)
    .then(([user]) => {
      return user;
    });
};

module.exports = modUserById;
