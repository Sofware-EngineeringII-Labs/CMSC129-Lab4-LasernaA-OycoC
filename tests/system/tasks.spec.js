// Import testing functions - define Page Obj Model style for selectors
const { test, expect } = require("@playwright/test");

// Look for HTML objects
const selectors = {
  titleInput: "[data-testid=task-title]",
  descriptionInput: "[data-testid=task-description]",
  addButton: "[data-testid=add-task]",
  taskList: "[data-testid=task-list]",
  // Dynamic selectors: look for func in specific item 
  taskItem: (title) => `[data-testid=task-item][data-title='${title}']`,
  editButton: (title) =>
    `[data-testid=task-item][data-title='${title}'] [data-testid=edit-task]`,
  deleteButton: (title) =>
    `[data-testid=task-item][data-title='${title}'] [data-testid=delete-task]`,
  // Selectors for edit modal
  editTitleInput: "[data-testid=edit-title]",
  editDescriptionInput: "[data-testid=edit-description]",
  saveButton: "[data-testid=save-task]"
};

// Helper: fill in form
async function createTask(page, { title, description }) {
  await page.fill(selectors.titleInput, title);
  await page.fill(selectors.descriptionInput, description);
  await page.click(selectors.addButton);
}

// TESTS
test.describe("Task manager system tests", () => {

  // Test 1: Create task
  test("create task adds it to the list", async ({ page }, testInfo) => { // Inject Playwright's browser page, testInfo -> holds metadata of test
    await page.goto("/");

    // Generate unique title using test name + timestamp to stop tests from colliding with left over data from prev runs
    const uniqueTitle = `${testInfo.title}-${Date.now()}`;

    // Call helper to fill out the form
    await createTask(page, {
      title: uniqueTitle,
      description: "Phase 4 RED"
    });

    // Verify task container is visible
    await expect(page.locator(selectors.taskList)).toBeVisible();
    // Check if newly created task item with unique title is visible
    await expect(page.locator(selectors.taskItem(uniqueTitle))).toBeVisible();
  });

  // Test 2: Edit task
  test("edit task updates title and description", async ({ page }, testInfo) => {
    await page.goto("/");

    const uniqueTitle = `${testInfo.title}-${Date.now()}`;

    // Create fresh task
    await createTask(page, {
      title: uniqueTitle,
      description: "Old description"
    });

    // Edit the task (no helper di ko alam bat di ako gumawa ng helper sabog)
    await page.click(selectors.editButton(uniqueTitle));
    const updatedTitle = `${uniqueTitle}-updated`;
    await page.fill(selectors.editTitleInput, updatedTitle);
    await page.fill(selectors.editDescriptionInput, "Updated description");
    await page.click(selectors.saveButton);

    // Verify updated task item is visible
    await expect(page.locator(selectors.taskItem(updatedTitle))).toBeVisible();
  });

  // Test 3: Delete task
  test("delete task removes it from the list", async ({ page }, testInfo) => {
    await page.goto("/");

    const uniqueTitle = `${testInfo.title}-${Date.now()}`;

    // Create fresh task
    await createTask(page, {
      title: uniqueTitle,
      description: "To be removed"
    });

    // Delete the task
    await page.click(selectors.deleteButton(uniqueTitle));

    // Verify taht unique task title doesnt exist anymore (DOM = 0)
    await expect(
      page.locator(selectors.taskItem(uniqueTitle))
    ).toHaveCount(0);
  });
});
