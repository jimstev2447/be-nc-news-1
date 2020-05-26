const modArticleById = require("../models/modArticleById");
// const errorCustomHandler = require("../errorHandlers/errorCustomHandler");

const getArticleById = (req, res, next) => {
  const { params } = req;
  const article_id = params["article_id"];

  modArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })

    .catch((error) => {
      next(error);
    });
};

module.exports = getArticleById;
