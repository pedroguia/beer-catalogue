import "@testing-library/jest-dom";
import getRoute from ".";

test("getRoute", () => {
  expect(getRoute.DETAIL(1)).toEqual("/beers/1");
});
