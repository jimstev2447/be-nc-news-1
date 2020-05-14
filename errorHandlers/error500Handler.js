const error500Handler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Internal server error." });
};

module.exports = error500Handler;
