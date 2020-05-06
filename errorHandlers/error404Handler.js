const error404Handler = (req, res, next) => {
  res
    .status(404)
    .send({ message: "The request resource or route was not found." });
};

module.exports = error404Handler;
