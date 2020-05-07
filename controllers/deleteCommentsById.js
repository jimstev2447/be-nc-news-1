const error404Handler = require("../errorHandlers/error404Handler");
const modDeleteCommentsById = require("../models/modDeleteCommentsById");

const deleteCommentsById = (req, res, next) => {
  const { comment_id } = req.params;

  modDeleteCommentsById(comment_id)
    .then((delCount) => {
      if (delCount === 0)
        return Promise.reject({
          status: 404,
          message: "Comment was not found.",
        });
      res.status(204).send();
    })
    .catch((error) => {
      error404Handler(req, res, next);
    });
};

module.exports = deleteCommentsById;
