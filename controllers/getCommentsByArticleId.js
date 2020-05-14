const modCommentsByArticleId = require("../models/modCommentsByArticleId");
const modArticleById = require("../models/modArticleById");

const getCommentsByArticleId = (req, res, next) => {
  const article_id = req.params["article_id"];
  const sort_by = req.query["sort_by"];
  const order = req.query.order;

  if (
    typeof parseInt(article_id) !== "number" ||
    sort_by == "not-a-valid-column"
  ) {
    next({ status: 400, message: "bad request" });
  } else {
    const checkArticleId = modArticleById(article_id);
    const checkCommentById = modCommentsByArticleId(article_id, sort_by, order);

    Promise.all([checkArticleId, checkCommentById])
      .then(([checkArticleId, comments]) => {
        res.status(200).send({ comments });
      })
      .catch(next);
  }
};

module.exports = getCommentsByArticleId;

/// get comments art 2  ----- sataus 200 {coments: []}
/// get commetns art 100000 ------ status 404 err: no resource found
/// get coment art hotdogs ===== 400
