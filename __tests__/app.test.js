process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app.js");

describe("Testing GET methods", () => {
  test("works", () => {
    return request(app).get("/api/topics");
  });
});
describe("Testing POST methods", () => {});
describe("Testing PATCH methods", () => {});
describe("Testing DELETE methods", () => {});
