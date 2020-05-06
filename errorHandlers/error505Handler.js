const error505Handler = () => {
  res.status(500).send({ message: "Internal server error." });
};

module.exports = error505Handler;
