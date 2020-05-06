const modSendAllArticles = require("../models/modSendAllArticles");

const getAllArticles = (req, res) => {
  modSendAllArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};

module.exports = getAllArticles;
