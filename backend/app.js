const express = require("express");
// Wired backend POST handler to use task model validation and normalization
// so API and unit logic stay aligned
// Add 400 response when title is missing/blank and trim
const {
	validateTaskInput,
	normalizeTaskInput
} = require("../frontend/src/taskModel");

const app = express();

app.use(express.json());

let nextId = 1;
const tasks = [];

app.get("/", (req, res) => {
	res.status(200).json(tasks);
});

app.get("/tasks", (req, res) => {
	res.status(200).json(tasks);
});

app.post("/tasks", (req, res) => {
	try {
		validateTaskInput(req.body);
		const normalized = normalizeTaskInput(req.body);
		const task = {
			id: String(nextId++),
			title: normalized.title,
			description: req.body && req.body.description
		};

		tasks.push(task);
		res.status(201).json(task);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = app;
