const apiRouter = require("express").Router();
const topicsRouter = require("./topicsRouter/topicsRouter");
const usersRouter = require("./usersRouter/usersRouter");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);

// apiRouter.use("/articles", () => {
//   console.log("articles router works");
// });
// apiRouter.use("/comments", () => {
//   console.log("comments router works");
// });

module.exports = apiRouter;
