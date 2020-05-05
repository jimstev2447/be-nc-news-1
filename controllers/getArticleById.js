const modArticlerById = require("../models/modArticleById");

const getArticleById = ({ params }, res) => {
  const article_id = params["article_id"];
  modArticlerById(article_id).then((article) => {
    res.status(200).send({ article });
  });
};

module.exports = getArticleById;
