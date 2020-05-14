const errorCustomHandler = (err, req, res, next) => {
  const psqlErrors = ["22P02"];
  if (psqlErrors.includes(err.code)) {
    //handle PSQL ERRORS
    res.status(400).send({ status: 400, message: "bad request" });
  }
  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  } else next();
};

module.exports = errorCustomHandler;
