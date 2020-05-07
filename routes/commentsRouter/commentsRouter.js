const commentsRouter = require("express").Router();
const deleteCommentsById = require("../../controllers/deleteCommentsById");
const patchCommentVoteById = require("../../controllers/patchCommentVoteById");
const error405Handler = require("../../errorHandlers/error405Handler");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentVoteById)
  .delete(deleteCommentsById)
  .all(error405Handler);

module.exports = commentsRouter;
