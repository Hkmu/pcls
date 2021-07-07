import { setPrefix, pcls } from "..";

describe("pcls without prefix", function () {
  it("keeps object keys with truthy values", function () {
    expect(
      pcls("btn", {
        a: true,
        b: false,
        c: 0,
        d: null,
        e: undefined,
        f: 1,
      })
    ).toBe("btn btn-a btn-f");
  });

  it("support an array of decorators", function () {
    expect(pcls("btn", ["primary", "danger"])).toBe(
      "btn btn-primary btn-danger"
    );
  });

  it("should be trimmed", function () {
    expect(pcls("btn ", [" danger", "primary "], "prop-cls")).toBe(
      "btn btn-danger btn-primary prop-cls"
    );
  });

  it("returns an empty string for an empty configuration", function () {
    expect(pcls("")).toBe("");
    expect(pcls(" ")).toBe("");
    expect(pcls(" ", {})).toBe("");
    expect(pcls(" ", null)).toBe("");
    expect(pcls(" ", undefined, "")).toBe("");
  });

  it("handles all types of truthy and falsy property values as expected", function () {
    expect(
      pcls("b", {
        // falsy:
        null: null,
        emptyString: "",
        noNumber: NaN,
        zero: 0,
        negativeZero: -0,
        false: false,
        undefined: undefined,
        // truthy (literally anything else):
        nonEmptyString: "foobar",
        whitespace: " ",
        function: Object.prototype.toString,
        emptyObject: {},
        nonEmptyObject: { a: 1, b: 2 },
        emptyList: [],
        nonEmptyList: [1, 2, 3],
        greaterZero: 1,
      })
    ).toBe(
      "b b-nonEmptyString b-whitespace b-function b-emptyObject b-nonEmptyObject b-emptyList b-nonEmptyList b-greaterZero"
    );
  });

  it("should return empty when name is empty", function () {
    expect(pcls("")).toBe("");
    expect(pcls(" ", {})).toBe("");
    expect(pcls(" ", null)).toBe("");
    expect(pcls(" ", undefined, "prop-cls")).toBe("");
    expect(pcls(" ", { a: true }, "prop-cls")).toBe("");
    expect(pcls(" ", ["a", "b"], "prop-cls")).toBe("");
  });
});

describe("pcls with prefix", function () {
  beforeAll(() => {
    setPrefix("bs-");
  });

  it("keeps object keys with truthy values", function () {
    expect(
      pcls("btn", {
        a: true,
        b: false,
        c: 0,
        d: null,
        e: undefined,
        f: 1,
      })
    ).toBe("bs-btn bs-btn-a bs-btn-f");
  });

  afterAll(() => {
    setPrefix("");
  });
});
