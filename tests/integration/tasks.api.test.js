const request = require("supertest");
const app = require("../../backend/app");

describe("Tasks API", () => {
  test("GET /tasks returns an array", async () => {
    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /tasks creates a task", async () => {
    const newTask = { title: "Write integration tests", description: "Phase 3 RED" };

    const response = await request(app).post("/tasks").send(newTask);

    expect(response.status).toBe(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: "Write integration tests",
        description: "Phase 3 RED"
      })
    );
  });
});
