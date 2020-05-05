const topicsRouter = require("express").Router();
const getAllTopics = require("../../controllers/getAllTopics");

topicsRouter.route("/").get(getAllTopics);

module.exports = topicsRouter;
