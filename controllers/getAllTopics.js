const modAllTopics = require("../models/modAllTopics");

const getAllTopics = (req, res) => {
  modAllTopics();
};

module.exports = getAllTopics;
