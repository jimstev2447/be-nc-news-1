const knex = require("../db/data/connection.js");

const modUserById = (username) => {
  return knex("users")
    .select("*")
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
