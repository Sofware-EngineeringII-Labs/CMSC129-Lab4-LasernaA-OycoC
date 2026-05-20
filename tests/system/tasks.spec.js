const { test, expect } = require("@playwright/test");

const selectors = {
  titleInput: "[data-testid=task-title]",
  descriptionInput: "[data-testid=task-description]",
  addButton: "[data-testid=add-task]",
  taskList: "[data-testid=task-list]",
  taskItem: (title) => `[data-testid=task-item][data-title='${title}']`,
  editButton: (title) =>
    `[data-testid=task-item][data-title='${title}'] [data-testid=edit-task]`,
  deleteButton: (title) =>
    `[data-testid=task-item][data-title='${title}'] [data-testid=delete-task]`,
  editTitleInput: "[data-testid=edit-title]",
  editDescriptionInput: "[data-testid=edit-description]",
  saveButton: "[data-testid=save-task]"
};

async function createTask(page, { title, description }) {
  await page.fill(selectors.titleInput, title);
  await page.fill(selectors.descriptionInput, description);
  await page.click(selectors.addButton);
}

test.describe("Task manager system tests", () => {
  test("create task adds it to the list", async ({ page }) => {
    await page.goto("/");

    await createTask(page, {
      title: "Write system tests",
      description: "Phase 4 RED"
    });

    await expect(page.locator(selectors.taskList)).toBeVisible();
    await expect(
      page.locator(selectors.taskItem("Write system tests"))
    ).toBeVisible();
  });

  test("edit task updates title and description", async ({ page }) => {
    await page.goto("/");

    await createTask(page, {
      title: "Old title",
      description: "Old description"
    });

    await page.click(selectors.editButton("Old title"));
    await page.fill(selectors.editTitleInput, "Updated title");
    await page.fill(selectors.editDescriptionInput, "Updated description");
    await page.click(selectors.saveButton);

    await expect(page.locator(selectors.taskItem("Updated title"))).toBeVisible();
  });

  test("delete task removes it from the list", async ({ page }) => {
    await page.goto("/");

    await createTask(page, {
      title: "Disposable task",
      description: "To be removed"
    });

    await page.click(selectors.deleteButton("Disposable task"));

    await expect(
      page.locator(selectors.taskItem("Disposable task"))
    ).toHaveCount(0);
  });
});
