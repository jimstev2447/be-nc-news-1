const modArticleById = require("../models/modArticleById");
const errorCustomHandler = require("../errorHandlers/errorCustomHandler");

const getArticleById = (req, res, next) => {
  const { params } = req;
  const article_id = params["article_id"];
  if (typeof parseInt(article_id) !== "number") {
    next({ status: 400, message: "bad request" });
  } else {
    modArticleById(article_id)
      .then((article) => {
        res.status(200).send({ article });
      })
      .catch((error) => {
        errorCustomHandler(error, req, res, next);
      });
  }
};

module.exports = getArticleById;
