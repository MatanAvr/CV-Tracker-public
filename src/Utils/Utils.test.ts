import { deepEqual, isValidUrl } from "./Utils";

describe("URL Validation Regex", () => {
  const functionToTest = isValidUrl;
  const validUrls = [
    "https://www.example.com",
    "http://example.com/page",
    "https://subdomain.example.co.uk",
    "https://www.example.com/page1/page2/page3",
    "https://www.linkedin.com/in/matan-avraham-il/",
    "https://github.com/MatanAvr",
  ];
  validUrls.forEach((url) => {
    test(`Valid url: ${url}`, () => {
      expect(functionToTest(url)).toBe(true);
    });
  });

  const invalidUrls = [
    "not a url",
    "ftp://example.com",
    "http://-invalid-.com",
    "http://example",
    "http://.example.com",
    "http://example..com",
  ];

  invalidUrls.forEach((url) => {
    test(`Invalid url: ${url}`, () => {
      expect(functionToTest(url)).toBe(false);
    });
  });
});

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
