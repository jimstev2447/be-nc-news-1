const modAllTopics = require("../models/modAllTopics");

const getAllTopics = (req, res) => {
  modAllTopics().then((allTopics) => {
    res.status(200).send({ allTopics });
  });
};

module.exports = getAllTopics;
