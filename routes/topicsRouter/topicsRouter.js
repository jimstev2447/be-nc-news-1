const topicsRouter = require("express").Router();
const getAllTopics = require("../../controllers/getAllTopics");
const error405Handler = require("../../errorHandlers/error405Handler");

topicsRouter.route("/").get(getAllTopics).all(error405Handler);

module.exports = topicsRouter;
