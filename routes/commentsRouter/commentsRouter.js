const commentsRouter = require("express").Router();
const deleteCommentsById = require("../../controllers/deleteCommentsById");
const patchCommentVoteById = require("../../controllers/patchCommentVoteById");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentVoteById)
  .delete(deleteCommentsById);

module.exports = commentsRouter;
