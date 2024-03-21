import { shuffle } from "../app/utils/shuffle";

describe("shuffle function", () => {
  it("returns an array of the same length as the input", () => {
    const array = [1, 2, 3, 4, 5];
    const shuffledArray = shuffle(array);
    expect(shuffledArray).toHaveLength(array.length);
  });

  it("ensures every element from the input is present in the output", () => {
    const array = [1, 2, 3, 4, 5];
    const shuffledArray = shuffle(array);
    array.forEach((item) => {
      expect(shuffledArray.includes(item)).toBe(true);
    });
  });
});
