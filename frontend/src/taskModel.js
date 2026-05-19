function validateTaskInput(input) {
  const title = (input && input.title) || "";
  if (title.trim().length === 0) {
    throw new Error("Title is required");
  }
}

function normalizeTaskInput(input) {
  return {
    title: input.title.trim()
  };
}

function createTaskRecord(input, id, createdAt) {
  return {
    id,
    title: input.title,
    completed: false,
    createdAt
  };
}

module.exports = {
  validateTaskInput,
  normalizeTaskInput,
  createTaskRecord
};
