const modPatchArticleById = require("../models/modPatchArticleById");

const patchArticleById = (req, res) => {
  modPatchArticleById().then(() => {
    res.status(200).send();
  });
};

module.exports = patchArticleById;
