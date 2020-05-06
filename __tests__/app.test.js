process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app.js");
const knex = require("../db/data/connection.js");

beforeEach(() => {
  return knex.seed.run();
});
afterAll(() => knex.destroy());

xdescribe("Testing GET methods", () => {
  xdescribe("Testing GET methods for 'topics'", () => {
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
  xdescribe("Testing GET methods for 'users'", () => {
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
  xdescribe("Testing GET methods for 'articles'", () => {
    xtest("Sends the article containing the required information, which the client searched for using the ID.", () => {
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
            comment_count: "13",
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
    xtest("Sends the comments of the article, which the client searched for using the ID.", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=created_at&&order=desc")
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
    xtest("Sends all the articles.", () => {
      return request(app)
        .get("/api/articles/")
        .then(({ body: { articles } }) => {
          expect(articles).toEqual([
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
              article_id: 12,
              title: "Moustache",
              body: "Have you seen the size of that thing?",
              votes: 0,
              topic: "mitch",
              author: "butter_bridge",
              created_at: "1974-11-26T12:21:54.171Z",
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
          ]);
          expect(typeof articles).toBe("object");
        });
    });
  });
});

xdescribe("Testing DELETE methods", () => {
  xdescribe("Testing DELETE methods for 'comments'", () => {
    test("it deletes a comment according to ID  ", () => {
      return request(app).del("/api/comments/1").expect(204);
    });
  });
});

describe.only("Testing PATCH methods", () => {
  describe.only("Testing PATCH methods for 'articles'", () => {
    test.only("Updates the number of votes that an article has, which the client searched for using the ID.", () => {
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
  });
});

// xdescribe("Testing POST methods", () => {});
