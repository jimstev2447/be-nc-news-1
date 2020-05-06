const modUserById = require("../models/modUserById.js");

const getUser = ({ params: { username } }, res) => {
  modUserById(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = getUser;
