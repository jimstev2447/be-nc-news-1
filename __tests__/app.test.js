process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app.js");
const knex = require("../db/data/connection.js");

describe.only("Testing GET methods", () => {
  afterAll(() => knex.destroy());
  describe("Testing GET methods for 'topics'", () => {
    test("Sends a response containing all topics to the user when it is passed the path '/api/topics/'. The response object contains the correct properties from the database.", () => {
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
  describe("Testing GET methods for 'users'", () => {
    test("Sends a response containing information about the user, which the client requested using the username.", () => {
      const firstRequest = request(app)
        .get("/api/users/rogersop")
        .then(({ body: { user } }) => {
          expect(user).toEqual({
            username: "rogersop",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
            name: "paul",
          });
          expect(typeof user).toBe("object");
          expect(user).toHaveProperty("username");
          expect(user).toHaveProperty("avatar_url");
          expect(user).toHaveProperty("name");
        });
      const secondRequest = request(app)
        .get("/api/users/lurker")
        .then(({ body: { user } }) => {
          expect(user).toEqual({
            username: "lurker",
            name: "do_nothing",
            avatar_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          });
          expect(typeof user).toBe("object");
          expect(user).toHaveProperty("username");
          expect(user).toHaveProperty("avatar_url");
          expect(user).toHaveProperty("name");
        });
      const thirdRequest = request(app)
        .get("/api/users/butter_bridge")
        .then(({ body: { user } }) => {
          expect(user).toEqual({
            username: "butter_bridge",
            name: "jonny",
            avatar_url:
              "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
          });
          expect(typeof user).toBe("object");
          expect(user).toHaveProperty("username");
          expect(user).toHaveProperty("avatar_url");
          expect(user).toHaveProperty("name");
        });
      return Promise.all([firstRequest, secondRequest, thirdRequest]);
    });
  });
  describe("Testing GET methods for 'articles'", () => {
    test("Sends a response containing information about the user, which the client requested using the username.", () => {
      const firstRequest = request(app)
        .get("/api/articles/rogersop")
        .then(({ body: { user } }) => {
          expect(user).toEqual({
            username: "rogersop",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
            name: "paul",
          });
          expect(typeof user).toBe("object");
          expect(user).toHaveProperty("username");
          expect(user).toHaveProperty("avatar_url");
          expect(user).toHaveProperty("name");
        });
      return Promise.all([firstRequest]);
    });
  });
});

// xdescribe("Testing POST methods", () => {});
// xdescribe("Testing PATCH methods", () => {});
// xdescribe("Testing DELETE methods", () => {});
