import fs from "fs";

import { countWords, getTopWordCount } from "./count";

describe("Count words", () => {
  it("should count correctly", () => {
    const count = countWords("Hello everyone hello");

    expect(count).toEqual({
      hello: 2,
      everyone: 1,
    });
  });

  it.each([
    { size: "short", expectedUnique: 140, expectedCountSed: 12 },
    { size: "medium", expectedUnique: 140, expectedCountSed: 336 },
    { size: "long", expectedUnique: 140, expectedCountSed: 8400 },
  ])(
    "should count correctly with $size.size data",
    ({ size, expectedUnique, expectedCountSed }) => {
      const path = `./data/test-files/${size}-text.txt`;
      const content = fs.readFileSync(path);
      const count = countWords(content);

      expect(Object.keys(count)).toHaveLength(expectedUnique);
      expect(count.sed).toEqual(expectedCountSed);
    }
  );

  it.each([
    {
      size: "short",
      expected: [
        { word: "sed", count: 12 },
        { word: "id", count: 10 },
        { word: "sit", count: 8 },
      ],
    },
    {
      size: "medium",
      expected: [
        { word: "sed", count: 336 },
        { word: "id", count: 280 },
        { word: "sit", count: 224 },
      ],
    },
    {
      size: "long",
      expected: [
        { word: "sed", count: 8400 },
        { word: "id", count: 7000 },
        { word: "sit", count: 5600 },
      ],
    },
  ])(
    "should order counts correctly with $size.size data",
    ({ size, expected }) => {
      const path = `./data/test-files/${size}-text.txt`;
      const content = fs.readFileSync(path);
      const count = countWords(content);
      const sorted = getTopWordCount(count, 3);

      expect(sorted).toEqual(expected);
    }
  );
});
