const modPatchCommentVoteById = require("../models/modPatchCommentVoteById");

const patchCommentVoteById = (req, res, next) => {
  const comment_id = req.params.comment_id;
  const incVotes = req.body.inc_votes || 0;
  if (
    typeof parseInt(incVotes) !== "number" ||
    typeof parseInt(comment_id) !== "number"
  ) {
    next({ status: 400, message: "bad request" });
  } else {
    modPatchCommentVoteById(comment_id, incVotes)
      .then((updatedComment) => {
        res.send({ comment: updatedComment });
      })
      .catch(next);
  }
};

module.exports = patchCommentVoteById;
