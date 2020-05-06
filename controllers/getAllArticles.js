const modSendAllArticles = require("../models/modSendAllArticles");

const getAllArticles = (req, res, next) => {
  modSendAllArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

module.exports = getAllArticles;
