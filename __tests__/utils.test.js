process.env.NODE_ENV = "test";

const {
  formatDates,
  makeRefObj,
  formatComments,
} = require("../db/utils/utils");

xdescribe("formatDates", () => {
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
  test("it creates a reference object from an array of objects using different arguments", () => {
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

xdescribe("makeRefObj", () => {
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

describe("formatComments", () => {});
