const modDeleteCommentsById = require("../models/modDeleteCommentsById");

const deleteCommentsById = (req, res) => {
  const { comment_id } = req.params;

  modDeleteCommentsById(comment_id).then((delCount) => {
    // console.log(delCount);
    res.status(204).send();
  });
};

module.exports = deleteCommentsById;
