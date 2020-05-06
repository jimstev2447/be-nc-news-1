const modArticlerById = require("../models/modArticleById");

const getArticleById = ({ params }, res, next) => {
  const article_id = params["article_id"];
  modArticlerById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

module.exports = getArticleById;
