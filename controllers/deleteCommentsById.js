const modDeleteCommentsById = require("../models/modDeleteCommentsById");

const deleteCommentsById = (req, res) => {
  modDeleteCommentsById().then(() => {
    res.status(204).send();
  });
};

module.exports = deleteCommentsById;
