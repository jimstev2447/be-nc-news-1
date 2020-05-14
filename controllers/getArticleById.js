const modArticleById = require("../models/modArticleById");
// const errorCustomHandler = require("../errorHandlers/errorCustomHandler");

const getArticleById = (req, res, next) => {
  const { params } = req;
  const article_id = params["article_id"];

  // if (typeof parseInt(article_id) !== "number") {
  //   next({ status: 400, message: "bad request" });
  // } else {
  modArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    // .catch(next); <----this won't work
    .catch((error) => {
      next(error);
      // errorCustomHandler(error, req, res, next); <---- line 17 and 18 will work as well
    });
};
//};

module.exports = getArticleById;
