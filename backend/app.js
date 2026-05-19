const express = require("express");

const app = express();

app.use(express.json());

let nextId = 1;
const tasks = [];

app.get("/tasks", (req, res) => {
	res.status(200).json(tasks);
});

app.post("/tasks", (req, res) => {
	const { title, description } = req.body || {};
	const task = {
		id: String(nextId++),
		title,
		description
	};

	tasks.push(task);
	res.status(201).json(task);
});

module.exports = app;
