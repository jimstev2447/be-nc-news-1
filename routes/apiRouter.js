const apiRouter = require("express").Router();
const topicsRouter = require("./topicsRouter/topicsRouter");

apiRouter.use("/topics", topicsRouter);
// apiRouter.use("/users", () => {
//   console.log("users router works");
// });
// apiRouter.use("/articles", () => {
//   console.log("articles router works");
// });
// apiRouter.use("/comments", () => {
//   console.log("comments router works");
// });

module.exports = apiRouter;
