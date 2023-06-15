import { setPrefix, pcls } from "..";

describe("pcls without prefix", function () {
  it("supports modifier object", function () {
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

  it("supports modifier array", function () {
    expect(pcls("btn", ["primary", "danger"])).toBe(
      "btn btn-primary btn-danger"
    );

    expect(
      pcls("btn", [
        0,
        "default",
        {
          info: true,
          danger: 0,
        },
        [],
      ])
    ).toBe("btn btn-0 btn-default btn-info");
  });

  it("should trim the result string", function () {
    expect(pcls("btn ", [" danger", "primary "])).toBe(
      "btn btn-danger btn-primary"
    );
  });

  it("should return an empty string if component name is not provided", function () {
    expect(pcls("")).toBe("");
    expect(pcls(" ")).toBe("");
    expect(pcls(" ", { info: "true" })).toBe("");
    expect(pcls(" ", ["a", "b", "c"])).toBe("");
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
});

describe("pcls with prefix", function () {
  beforeAll(() => {
    setPrefix("bs");
  });

  it("supports modifier object", function () {
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
