const {
  validateTaskInput,
  normalizeTaskInput,
  createTaskRecord
} = require("../../frontend/src/taskModel");

describe("taskModel unit tests", () => {
  test("validateTaskInput throws when title is empty", () => {
    expect(() => validateTaskInput({ title: "   " })).toThrow(
      "Title is required"
    );
  });

  test("normalizeTaskInput trims the title", () => {
    const result = normalizeTaskInput({ title: "  Buy milk  " });
    expect(result).toEqual({ title: "Buy milk" });
  });

  test("createTaskRecord builds a new task with defaults", () => {
    const createdAt = "2026-05-20T00:00:00.000Z";
    const result = createTaskRecord({ title: "Walk dog" }, 101, createdAt);

    expect(result).toEqual({
      id: 101,
      title: "Walk dog",
      completed: false,
      createdAt
    });
  });
});
