import { deepEqual } from "./Utils";

describe("deepEqual tests", () => {
  const functionToTest = deepEqual;

  const sameObjArr = [
    [
      { a: 1, b: { c: 2 } },
      { a: 1, b: { c: 2 } },
    ],
  ];

  sameObjArr.forEach((sameObj) => {
    test(`Same objects`, () => {
      expect(functionToTest(sameObj[0], sameObj[1])).toBe(true);
    });
  });

  const notSameObjArr = [
    [
      { a: 1, b: { c: 2 } },
      { a: 1, b: { c: 3 } },
    ],
  ];

  notSameObjArr.forEach((notSameObj) => {
    test(`Not same objects`, () => {
      expect(functionToTest(notSameObj[0], notSameObj[1])).toBe(false);
    });
  });
});
