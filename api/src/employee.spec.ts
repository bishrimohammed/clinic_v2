import { describe } from "mocha";
import { expect } from "chai";
import { Employee } from "./models";

describe("Employee Test", () => {
  it("should create employee", async () => {
    const num1 = 3;
    const num2 = 6;
    expect(num1 + num2).to.equal(9);
  });
});
