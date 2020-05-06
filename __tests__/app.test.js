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
  describe.only("Testing GET methods for 'articles'", () => {
    test("Sends the article containing the required information, which the client searched for using the ID.", () => {
      const firstRequest = request(app)
        .get("/api/articles/1")
        .then(({ body: { article } }) => {
          expect(article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 100,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2018-11-15T12:21:54.171Z",
            comment_count: "0",
          });
          expect(typeof article).toBe("object");
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("body");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("comment_count");
        });
      const secondRequest = request(app)
        .get("/api/articles/3")
        .then(({ body: { article } }) => {
          expect(article).toEqual({
            article_id: 3,
            title: "Eight pug gifs that remind me of mitch",
            body: "some gifs",
            votes: 0,
            topic: "mitch",
            author: "icellusedkars",
            created_at: "2010-11-17T12:21:54.171Z",
            comment_count: "0",
          });
          expect(typeof article).toBe("object");
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("body");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("comment_count");
        });
      const thirdRequest = request(app)
        .get("/api/articles/7")
        .then(({ body: { article } }) => {
          expect(article).toEqual({
            article_id: 7,
            title: "Z",
            body: "I was hungry.",
            votes: 0,
            topic: "mitch",
            author: "icellusedkars",
            created_at: "1994-11-21T12:21:54.171Z",
            comment_count: "0",
          });
          expect(typeof article).toBe("object");
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("body");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("comment_count");
        });
      return Promise.all([firstRequest, secondRequest, thirdRequest]);
    });
    test.only("Sends the comments of the article, which the client searched for using the ID.", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=created_at&&order=desc")
        .then((res) => {
          console.log(res);
          expect(article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 100,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2018-11-15T12:21:54.171Z",
            comment_count: "0",
          });
          expect(typeof article).toBe("object");
        });
    });
  });
});

// xdescribe("Testing PATCH methods", () => {
//   describe.only("Testing PATCH methods for 'articles'", () => {
//     test.only("Updates the number of votes that an article has, which the client searched for using the ID.", () => {
//       return request(app)
//         .patch("/api/articles/1")
//         .then(({ body: { article } }) => {
//           expect(article).toEqual({
//             article_id: 1,
//             title: "Living in the shadow of a great man",
//             body: "I find this existence challenging",
//             votes: 100,
//             topic: "mitch",
//             author: "butter_bridge",
//             created_at: "2018-11-15T12:21:54.171Z",
//             comment_count: "0",
//           });
//         });
//     });
//   });
// });

// xdescribe("Testing POST methods", () => {});
// xdescribe("Testing DELETE methods", () => {});
