const topicsRouter = require("express").Router();
const getAllTopics = require("../../controllers/getAllTopics");
const error405Handler = require("../../errorHandlers/error405Handler");

topicsRouter
  .route("/")
  .get(getAllTopics)
  .all((req, res, next) => {
    res.status(405).send({ message: "Invalid method" });
  });

module.exports = topicsRouter;
