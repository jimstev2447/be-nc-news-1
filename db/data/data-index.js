const ENV = process.env.NODE_ENV || "development";

const data = {
  production: require("./development-data/dev-data-index"),
  development: require("./development-data/dev-data-index"),
  test: require("./test-data/test-data-index"),
};

module.exports = data[ENV];
