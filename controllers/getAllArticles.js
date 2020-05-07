const modSendAllArticles = require("../models/modSendAllArticles");
const errorCustomHandler = require("../errorHandlers/errorCustomHandler");

const getAllArticles = (req, res, next) => {
  modSendAllArticles(req.query)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((error) => {
      errorCustomHandler(error, req, res, next);
    });
};

module.exports = getAllArticles;
