const modPatchCommentVoteById = require("../models/modPatchCommentVoteById");

const patchCommentVoteById = (req, res) => {
  const comment_id = req.params.comment_id;
  const incVotes = req.body.inc_votes;

  modPatchCommentVoteById(comment_id, incVotes).then((updatedComment) => {
    res.status(200).send({ comment: updatedComment });
  });
};

module.exports = patchCommentVoteById;
