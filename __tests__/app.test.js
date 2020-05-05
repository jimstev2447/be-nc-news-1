process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app.js");
const knex = require("../db/data/connection.js");

describe.only("Testing GET methods", () => {
  afterAll(() => {
    return knex.destroy();
  });
  test.only("Sends a response containing all topics to the user", () => {
    return request(app)
      .get("/api/topics/")
      .then((res) => {
        expect(res.body.topics).toEqual([
          { slug: "mitch", description: "The man, the Mitch, the legend" },
          { slug: "cats", description: "Not dogs" },
          { slug: "paper", description: "what books are made of" },
        ]);
      });
  });
});

xdescribe("Testing POST methods", () => {});
xdescribe("Testing PATCH methods", () => {});
xdescribe("Testing DELETE methods", () => {});
