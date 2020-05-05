const usersRouter = require("express").Router();
const getUser = require("../../controllers/getUser");

usersRouter.route("/:username").get(getUser);

module.exports = usersRouter;
