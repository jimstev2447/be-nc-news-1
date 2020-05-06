const modPatchCommentVoteById = require("../models/modPatchCommentVoteById");

const patchCommentVoteById = (req, res) => {
  modPatchCommentVoteById().then(() => {
    res.send();
  });
};

module.exports = patchCommentVoteById;
