const modUserById = require("../models/modUserById.js");

const getUser = (req, res) => {
  const { username } = req.params;
  modUserById(username).then((user) => {
    res.status(200).send({ user });
  });
};

module.exports = getUser;
