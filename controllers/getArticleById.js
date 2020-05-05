const modArticlerById = require("../models/modArticleById");

const getArticleById = ({ paras: { article_id } }, res) => {
  modArticlerById(article_id).then((article) => {
    res.status(200).send({ article });
  });
};

module.exports = getArticleById;
