const error500Handler = (err, req, res, next) => {
  res.status(500).send({ message: "Internal server error." });
};

module.exports = error500Handler;
