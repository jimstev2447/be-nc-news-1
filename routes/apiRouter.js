const apiRouter = require("express").Router();

apiRouter.use("/topics", () => {
  console.log("topics router works");
});
// apiRouter.use("/users", () => {
//   console.log("users router works");
// });
// apiRouter.use("/articles", () => {
//   console.log("articles router works");
// });
// apiRouter.use("/comments", () => {
//   console.log("comments router works");
// });
