const usersRouter = require("express").Router();
const getUser = require("../../controllers/getUser");

usersRouter.route("/").get(getUser);

module.exports = usersRouter;
