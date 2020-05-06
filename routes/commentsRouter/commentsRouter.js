const commentsRouter = require("express").Router();
const deleteCommentsById = require("../../controllers/deleteCommentsById");

commentsRouter.route("/:comment_id").delete(deleteCommentsById);

module.exports = commentsRouter;
