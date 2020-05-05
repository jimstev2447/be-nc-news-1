const {
  formatDates,
  makeRefObj,
  formatComments,
} = require("../db/utils/utils");

describe("formatDates", () => {});

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

describe("formatComments", () => {});
