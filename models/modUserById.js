const knex = require("../db/data/connection.js");

const modUserById = (username) => {
  return knex
    .select("*")
    .from("users")
    .where("users.username", "=", `${username}`)
    .then(([user]) => {
      if (!user) {
        return Promise.reject({
          status: 404,
          msg: "User not found.",
        });
      } else {
        return user;
      }
    });
};

module.exports = modUserById;
