process.env.NODE_ENV = "test";

const {
  formatDates,
  makeRefObj,
  formatComments,
} = require("../db/utils/utils");

describe("formatDates", () => {
  test("returns an empty array, when passed an empty array", () => {
    const list = [];
    const actual = formatDates(list);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  test("it does not mutate the original list", () => {
    const list = [];
    formatDates(list);
    expect(list).toEqual([]);
  });
  test("it reformates the date to a javascript object", () => {
    const list = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171,
      },
    ];
    expect(formatDates(list)).toEqual([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(1542284514171),
        votes: 100,
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: new Date(1289996514171),
      },
    ]);
  });
});

describe("makeRefObj", () => {
  test("returns an empty object, when passed an empty array", () => {
    const list = [];
    const actual = makeRefObj(list);
    const expected = {};
    expect(actual).toEqual(expected);
  });
  test("it does not mutate the original list", () => {
    const list = [];
    makeRefObj(list);
    expect(list).toEqual([]);
  });
  test("it creates a reference object from an array of objects using different arguments", () => {
    const list = [{ article_id: 1, title: "A" }];
    expect(makeRefObj(list)).toEqual({
      A: 1,
    });
  });
});

describe("formatComments", () => {
  test("returns an empty array, when passed an empty array", () => {
    const comments = [];
    const articleRef = {};
    const actual = formatComments(comments, articleRef);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  test("it does not mutate the original list", () => {
    const comments = [];
    const articleRef = {};
    formatComments(comments, articleRef);
    expect(comments).toEqual([]);
  });
  test("it creates a reference object from an array of objects using different arguments", () => {
    const articleRef = {
      "Living in the shadow of a great man": 1,
      "They're not exactly dogs, are they?": 9,
    };
    const comments = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
    ];
    expect(formatComments(comments, articleRef)).toEqual([
      {
        article_id: 9,
        author: "butter_bridge",
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        created_at: new Date(1511354163389),
        votes: 16,
      },
      {
        article_id: 1,
        author: "butter_bridge",
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        created_at: new Date(1479818163389),
        votes: 14,
      },
    ]);
  });
});
