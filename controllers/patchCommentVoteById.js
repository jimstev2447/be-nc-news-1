const modPatchCommentVoteById = require("../models/modPatchCommentVoteById");

const patchCommentVoteById = (req, res, next) => {
  const comment_id = req.params.comment_id;
  const incVotes = req.body.inc_votes;

  modPatchCommentVoteById(comment_id, incVotes)
    .then((updatedComment) => {
      res.status(200).send({ comment: updatedComment });
    })
    .catch(next);
};

module.exports = patchCommentVoteById;
