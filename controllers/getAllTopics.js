const modAllTopics = require("../models/modAllTopics");

const getAllTopics = (req, res, next) => {
  modAllTopics()
    .then((allTopics) => {
      res.status(200).send({ topics: allTopics });
    })
    .catch(next);
};

module.exports = getAllTopics;
