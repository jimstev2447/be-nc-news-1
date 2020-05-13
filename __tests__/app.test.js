process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app.js");
const knex = require("../db/data/connection.js");

beforeEach(() => {
  return knex.seed.run();
});
afterAll(() => knex.destroy());

describe("Testing GET methods", () => {
  describe("Testing GET methods for 'topics'", () => {
    test("Sends a response containing all topics to the user when it is passed the path '/api/topics/'. The response object contains the correct properties from the database.", () => {
      return request(app)
        .get("/api/topics/")
        .expect(200)
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
    test("Sends a 404 error when given the wrong input", () => {
      return request(app).get("/nothing").expect(404);
    });
  });
  describe("Testing GET methods for 'users'", () => {
    test("Sends a response containing information about the user, which the client requested using the username.", () => {
      const firstRequest = request(app)
        .get("/api/users/rogersop")
        .expect(200)
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
      return Promise.all([firstRequest, secondRequest]);
    });
    test("Sends a 404 error when given the wrong input", () => {
      return request(app)
        .get("/api/user/")
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("The request resource or route was not found.");
        });
    });
  });
  describe("Testing GET methods for 'articles'", () => {
    test("pass in query", () => {
      return request(app)
        .get(
          "/api/articles?sort_by=author&order=asc&author=icellusedkars&topic=mitch"
        )
        .expect(200);
    });
    test("pass in non-existent author", () => {
      return request(app).get("/api/articles?author=blah").expect(404);
    });
    test("it returns an empty array when searched for a topic or author that does exist, but the author did not write any articles", () => {
      return request(app)
        .get("/api/articles?author=lurker")
        .expect(200)
        .then((res) => {
          expect(res.body.articles).toEqual([]);
        });
    });
    test("pass in non-existent topic", () => {
      return request(app).get("/api/articles?topic=blah").expect(404);
    });
    test("pass in topic that exists and has no articles", () => {
      return request(app).get("/api/articles?topic=cats").expect(200);
    });

    test("Sends the article containing the required information, which the client searched for using the ID.", () => {
      return request(app)
        .get("/api/articles/1")
        .then((res) => {
          return res;
        })
        .then(({ body: { article } }) => {
          expect(article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 100,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2018-11-15T12:21:54.171Z",
            comment_count: "13",
          });
          expect(typeof article).toBe("object");
        });
    });
    test("Sends a 400 error when searching incorrectly for an article.", () => {
      return request(app).get("/api/articles/%!&%$").expect(400);
    });
    test("Sends a 404 error when searching for a non-existent article.", () => {
      return request(app).get("/api/articles/12312313").expect(404);
    });
    test("Sends the comments of the article, which the client searched for using the ID.", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .then(({ body: { comments } }) => {
          expect(comments[0]).toEqual({
            comment_id: 2,
            author: "butter_bridge",
            article_id: 1,
            votes: 14,
            created_at: "2016-11-22T12:36:03.389Z",
            body:
              "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
          });
          expect(typeof comments[0]).toBe("object");
        });
    });

    test("Sends all the articles.", () => {
      return request(app)
        .get("/api/articles/")
        .then(({ body: { articles } }) => {
          expect(articles).toEqual([
            {
              article_id: 1,
              title: "Living in the shadow of a great man",
              body: "I find this existence challenging",
              votes: 100,
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2018-11-15T12:21:54.171Z",
              comment_count: "13",
            },
            {
              article_id: 2,
              title: "Sony Vaio; or, The Laptop",
              body:
                "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
              votes: 0,
              topic: "mitch",
              author: "icellusedkars",
              created_at: "2014-11-16T12:21:54.171Z",
              comment_count: "0",
            },
            {
              article_id: 3,
              title: "Eight pug gifs that remind me of mitch",
              body: "some gifs",
              votes: 0,
              topic: "mitch",
              author: "icellusedkars",
              created_at: "2010-11-17T12:21:54.171Z",
              comment_count: "0",
            },
            {
              article_id: 4,
              title: "Student SUES Mitch!",
              body:
                "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
              votes: 0,
              topic: "mitch",
              author: "rogersop",
              created_at: "2006-11-18T12:21:54.171Z",
              comment_count: "0",
            },
            {
              article_id: 5,
              title: "UNCOVERED: catspiracy to bring down democracy",
              body: "Bastet walks amongst us, and the cats are taking arms!",
              votes: 0,
              topic: "cats",
              author: "rogersop",
              created_at: "2002-11-19T12:21:54.171Z",
              comment_count: "2",
            },
            {
              article_id: 6,
              title: "A",
              body: "Delicious tin of cat food",
              votes: 0,
              topic: "mitch",
              author: "icellusedkars",
              created_at: "1998-11-20T12:21:54.171Z",
              comment_count: "1",
            },
            {
              article_id: 7,
              title: "Z",
              body: "I was hungry.",
              votes: 0,
              topic: "mitch",
              author: "icellusedkars",
              created_at: "1994-11-21T12:21:54.171Z",
              comment_count: "0",
            },
            {
              article_id: 8,
              title: "Does Mitch predate civilisation?",
              body:
                "Archaeologists have uncovered a gigantic statue from the dawn of humanity, and it has an uncanny resemblance to Mitch. Surely I am not the only person who can see this?!",
              votes: 0,
              topic: "mitch",
              author: "icellusedkars",
              created_at: "1990-11-22T12:21:54.171Z",
              comment_count: "0",
            },
            {
              article_id: 9,
              title: "They're not exactly dogs, are they?",
              body: "Well? Think about it.",
              votes: 0,
              topic: "mitch",
              author: "butter_bridge",
              created_at: "1986-11-23T12:21:54.171Z",
              comment_count: "2",
            },
            {
              article_id: 10,
              title: "Seven inspirational thought leaders from Manchester UK",
              body: "Who are we kidding, there is only one, and it's Mitch!",
              votes: 0,
              topic: "mitch",
              author: "rogersop",
              created_at: "1982-11-24T12:21:54.171Z",
              comment_count: "0",
            },
            {
              article_id: 11,
              title: "Am I a cat?",
              body:
                "Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?",
              votes: 0,
              topic: "mitch",
              author: "icellusedkars",
              created_at: "1978-11-25T12:21:54.171Z",
              comment_count: "0",
            },
            {
              article_id: 12,
              title: "Moustache",
              body: "Have you seen the size of that thing?",
              votes: 0,
              topic: "mitch",
              author: "butter_bridge",
              created_at: "1974-11-26T12:21:54.171Z",
              comment_count: "0",
            },
          ]);
          expect(typeof articles).toBe("object");
        });
    });
    test("Send 404 errors when given a bad path for a request of all the articles.", () => {
      return request(app)
        .get("/api7^article$234s/")
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("The request resource or route was not found.");
        });
    });
  });
  describe("Testing GET method for the endpoints", () => {
    test("it returns the endpoints of the api server", () => {
      return request(app).get("/api/").expect(200);
    });
  });
});

describe("Testing DELETE methods", () => {
  describe("Testing DELETE methods for 'comments'", () => {
    test("it deletes a comment according to ID", () => {
      return request(app).del("/api/comments/1").expect(204);
    });
    test("Sends a 404 error when given the wrong comment ID", () => {
      return request(app)
        .del("/api/comments/10000")
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("The request resource or route was not found.");
        });
    });
  });
});

describe("Testing PATCH methods", () => {
  describe("Testing PATCH methods for 'articles'", () => {
    test("Updates the number of votes that an article has, which the client searched for using the ID.", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 10 })
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 110,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2018-11-15T12:21:54.171Z",
          });
        });
    });
    test("Sends a 405 error.", () => {
      return request(app)
        .patch("/api/topics/")
        .send({ inc_votes: 10 })
        .expect(405)
        .then((res) => {
          expect(res.body.message).toBe("Invalid method");
        });
    });
  });
  describe("Testing PATCH methods for 'comments'", () => {
    test("Updates the number of votes that an article has, which the client searched for using the ID.", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 10 })
        .expect(200)
        .then(({ body: { comment } }) => {
          expect(comment).toEqual({
            comment_id: 1,
            author: "butter_bridge",
            article_id: 9,
            votes: 26,
            created_at: "2017-11-22T12:36:03.389Z",
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          });
        });
    });
    test("It ignores a patch request with no information and sends back the comment with the same number of votes as before.", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({})
        .expect(200)
        .then(({ body: { comment } }) => {
          expect(comment).toEqual({
            comment_id: 1,
            author: "butter_bridge",
            article_id: 9,
            votes: 16,
            created_at: "2017-11-22T12:36:03.389Z",
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          });
        });
    });
    test("Failed to find patch on topics", () => {
      return request(app)
        .patch("/api/topics/")
        .send({ inc_votes: 10 })
        .expect(405);
    });

    test("Sends a 404 error when given the wrong information to patch", () => {
      return request(app)
        .patch("/api/comment£ER/1")
        .send({ inc_votes: 10 })
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("The request resource or route was not found.");
        });
    });
  });
});

describe("Testing POST methods", () => {
  describe("Testing POST methods for comments by article ID", () => {
    test("Posts a new comment to an article which was selected by article ID.", () => {
      return request(app)
        .post("/api/articles/9/comments")
        .send({
          body: "This works!",
          username: "butter_bridge",
        })
        .expect(201)
        .then(({ body: { comment } }) => {
          expect(comment[0]["author"]).toEqual("butter_bridge");
          expect(comment[0]["body"]).toEqual("This works!");
          expect(comment[0]).toHaveProperty("comment_id");
          expect(comment[0]).toHaveProperty("author");
          expect(comment[0]).toHaveProperty("votes");
          expect(comment[0]).toHaveProperty("created_at");
        });
    });
    test("Sends a 404 error when given the wrong information to post", () => {
      return request(app)
        .post("/api/articleZ/U9/coms")
        .send({
          body: "This works!",
          username: "butter_bridge",
        })
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("The request resource or route was not found.");
        });
    });
    test("Sends a 400 error when given the wrong article ID", () => {
      return request(app)
        .post("/api/articles/U/comments")
        .send({})
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("bad request");
        });
    });
  });
});

describe("implementing feedback", () => {
  describe("GET methods feedback", () => {
    test("### GET `/api/articles/dog` to send a 400", () => {
      return request(app)
        .get("/api/articles/dog")
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Bad request.");
        });
    });
    test("### GET `/api/articles?sort_by=not-a-column` to send a 400", () => {
      return request(app)
        .get("/api/articles?sort_by=not-a-column")
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Bad request.");
        });
    });
    test("### GET `/api/articles/1000/comments` to send a 404", () => {
      return request(app)
        .get("/api/articles/1000/comments")
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("The request resource or route was not found.");
        });
    });
    test("### GET `/api/articles/not-a-valid-id/comments` to send a 400", () => {
      return request(app)
        .get("/api/articles/not-a-valid-id/comments")
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Bad request.");
        });
    });
    test("### GET `/api/articles/1/comments?sort_by=not-a-valid-column` to send a 400", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=not-a-valid-column")
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Bad request.");
        });
    });
  });
  describe("PATCH methods feedback", () => {
    test("### PATCH `/api/articles` to send a 405", () => {
      return request(app)
        .patch("/api/articles")
        .expect(405)
        .then(({ body: { message } }) => {
          expect(message).toBe("Invalid method.");
        });
    });
    test("### PATCH `/api/articles/1` to send a 400", () => {
      return request(app)
        .patch("/api/articles/1")
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Bad request.");
        });
    });
    test("### PATCH `/api/comments/1` to send a 400", () => {
      return request(app)
        .patch("/api/comments/1")
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Bad request.");
        });
    });
    test("### PATCH `/api/comments/1000` to send a 404", () => {
      return request(app)
        .patch("/api/comments/1000")
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toBe("Resource or path not found.");
        });
    });
    test("### PATCH `/api/comments/not-a-valid-id` to send a 400", () => {
      return request(app)
        .patch("/api/comments/not-a-valid-id")
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Bad request.");
        });
    });
  });
  describe("PUT methods feedback", () => {
    test("### PUT `/api/articles/1` to send back a 405", () => {
      return request(app)
        .put("/api/articles/1")
        .expect(405)
        .then(({ body: { message } }) => {
          expect(message).toBe("Invalid method.");
        });
    });
    test("### PUT `/api/articles/1/comments` to send back a 405", () => {
      return request(app)
        .put("/api/articles/1/comments")
        .expect(405)
        .then(({ body: { message } }) => {
          expect(message).toBe("Invalid method.");
        });
    });
    test("### PUT `/api/comments/1` to send back a 405", () => {
      return request(app)
        .put("/api/comments/1")
        .expect(405)
        .then(({ body: { message } }) => {
          expect(message).toBe("Invalid method.");
        });
    });
    test("### PUT `/api/users/butter_bridge` to send back a 405", () => {
      return request(app)
        .put("/api/users/butter_bridge")
        .expect(405)
        .then(({ body: { message } }) => {
          expect(message).toBe("Invalid method.");
        });
    });
  });
  describe("DELETE methods feedback", () => {
    test("### DELETE `/api/comments/not-a-number` to send back a 400", () => {
      return request(app)
        .delete("/api/articles/1")
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toBe("Bad request.");
        });
    });
    test("### DELETE `/api` to send back a 405", () => {
      return request(app)
        .delete("/api")
        .expect(405)
        .then(({ body: { message } }) => {
          expect(message).toBe("Invalid method.");
        });
    });
  });
});
