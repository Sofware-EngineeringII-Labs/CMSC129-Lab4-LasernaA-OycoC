function getTitle(input) {
  return (input && input.title) || "";
}

function validateTaskInput(input) {
  const title = getTitle(input);
  if (title.trim().length === 0) {
    throw new Error("Title is required");
  }
}

function normalizeTaskInput(input) {
  return {
    title: getTitle(input).trim()
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
