const error405Handler = (req, res, next) => {
  if (!res.statusCode) {
    res.status(405).send({ message: "Invalid method" });
  }
  next();
};

module.exports = error405Handler;
