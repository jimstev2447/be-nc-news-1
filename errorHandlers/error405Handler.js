const error405Handler = (req, res, next) => {
  res.status(405).send({ message: "Invalid method" });
};

module.exports = error405Handler;
