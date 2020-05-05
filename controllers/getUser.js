const modUser = require("../models/modUser");

const getUser = (req, res) => {
  modUser().then((user) => {
    res.status(200).send({ user: user });
  });
};

module.exports = getUser;
