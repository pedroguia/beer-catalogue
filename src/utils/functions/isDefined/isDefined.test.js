import "@testing-library/jest-dom";
import isDefined from ".";

test("isDefined", () => {
  expect(isDefined(null)).toEqual(false);
  expect(isDefined(undefined)).toEqual(false);
  expect(isDefined("test")).toEqual(true);
});
