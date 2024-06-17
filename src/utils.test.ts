import { expect, test } from "bun:test";
import { escape, isIncludesTest, replaceHeading } from "./utils";

test("escape", () => {
  expect(escape("<T>")).toEqual("&lt;T&gt;");
});

test("replaceHeading", () => {
  let raw = "# heading 1\n\n## heading 2\n\n## heading 2.1\n\n### heading 3";

  expect(replaceHeading(raw, 2)).toEqual(
    "### heading 1\n\n#### heading 2\n\n#### heading 2.1\n\n##### heading 3",
  );
  expect(replaceHeading(raw, 3)).toEqual(
    "#### heading 1\n\n##### heading 2\n\n##### heading 2.1\n\n###### heading 3",
  );

  raw = "## heading 2\n\n### heading 2.1\n\n#### heading 3";

  expect(replaceHeading(raw, 1)).toEqual(
    "## heading 2\n\n### heading 2.1\n\n#### heading 3",
  );
  expect(replaceHeading(raw, 3)).toEqual(
    "#### heading 2\n\n##### heading 2.1\n\n###### heading 3",
  );
});

test("isIncludesTest", () => {
  expect(isIncludesTest("println")).toEqual(false);
  expect(isIncludesTest("test")).toEqual(false);
  expect(isIncludesTest("test(")).toEqual(false);
  expect(isIncludesTest(`fn main() throws {`)).toEqual(false);
  expect(isIncludesTest(`fn main() {`)).toEqual(false);
  expect(isIncludesTest(`assert 1 == 1`)).toEqual(true);
  expect(isIncludesTest(`assert_eq 1, 1`)).toEqual(true);
  expect(isIncludesTest(`assert_ne 1, 1`)).toEqual(true);
  expect(isIncludesTest(`test  "hello"  {`)).toEqual(true);
});
