const errorCustomHandler = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ message: err.message });
  else next(err);
};

module.exports = errorCustomHandler;
