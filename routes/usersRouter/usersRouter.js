const usersRouter = require("express").Router();
const getUser = require("../../controllers/getUser");
const error405Handler = require("../../errorHandlers/error405Handler");

usersRouter.route("/:username").get(getUser).all(error405Handler);

module.exports = usersRouter;
