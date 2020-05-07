const modArticlerById = require("../models/modArticleById");

const getArticleById = ({ params }, res, next) => {
  const article_id = params["article_id"];
  if (typeof parseInt(article_id) !== "number") {
    next({ status: 400, message: "bad request" });
  } else {
    modArticlerById(article_id)
      .then((article) => {
        res.status(200).send({ article });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
};

module.exports = getArticleById;
