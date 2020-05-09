const errorCustomHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  } else next();
};

module.exports = errorCustomHandler;
