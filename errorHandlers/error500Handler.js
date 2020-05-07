const error500Handler = (err, req, res, next) => {
  if (err.code === "22P02")
    res.status(500).send({ message: "Internal server error." });
};

module.exports = error500Handler;
