process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app.js");
const knex = require("../db/data/connection.js");

describe.only("Testing GET methods", () => {
  afterAll(() => knex.destroy());
  describe.only("Testing GET methods for 'topics'", () => {
    test.only("Sends a response containing all topics to the user when it is passed the path '/api/topics/'. The response object contains the correct properties from the database.", () => {
      return request(app)
        .get("/api/topics/")
        .then(({ body: { topics } }) => {
          topics.forEach((topic) => {
            expect(topic).toHaveProperty("slug");
            expect(topic).toHaveProperty("description");
          });
          expect(topics).toEqual([
            { slug: "mitch", description: "The man, the Mitch, the legend" },
            { slug: "cats", description: "Not dogs" },
            { slug: "paper", description: "what books are made of" },
          ]);
          expect(typeof topics).toBe("object");
          expect(Array.isArray(topics)).toBe(true);
        });
    });
  });
});

// xdescribe("Testing POST methods", () => {});
// xdescribe("Testing PATCH methods", () => {});
// xdescribe("Testing DELETE methods", () => {});
