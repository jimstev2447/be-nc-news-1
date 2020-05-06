const modSendAllArticles = require("../models/modSendAllArticles");

const getAllArticles = (req, res) => {
  modSendAllArticles().then(() => {});
};

module.exports = getAllArticles;
