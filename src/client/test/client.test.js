import "babel-polyfill";
const { checkURL } = require("../js/checkURL");

describe("CheckURL Testing", () => {
  it("Check URL -> Should return false", () => {
    const result = checkURL("abc");
    expect(result).toBeFalsy();
  });

  it("Check URL -> Should return true", () => {
    const result = checkURL("www.google.com");
    expect(result).toBeTruthy();
  });
});
