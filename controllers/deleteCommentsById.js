const error404Handler = require("../errorHandlers/error404Handler");
const modDeleteCommentsById = require("../models/modDeleteCommentsById");

const deleteCommentsById = (req, res, next) => {
  const { comment_id } = req.params;
  if (typeof parseInt(comment_id) !== "number") {
    next({ status: 400, message: "bad request" });
  } else {
    modDeleteCommentsById(comment_id)
      .then((delCount) => {
        res.status(204).send();
      })
      .catch(next);
  }
};

module.exports = deleteCommentsById;
