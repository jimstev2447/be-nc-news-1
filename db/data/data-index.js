const ENV = process.env.NODE_ENV || "development";

const data = {
  development: require("./development-data/dev-data-index"),
  test: require("./test-data/test-data-index"),
};

module.exports = data[ENV];
