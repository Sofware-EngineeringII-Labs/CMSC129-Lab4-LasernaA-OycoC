import { useEffect, useMemo, useState } from "react";

const API_BASE = "/api/tasks";

function buildTitleAttribute(title) {
  return String(title || "");
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    let isMounted = true;
    fetch(API_BASE)
      .then((response) => response.json())
      .then((data) => {
        if (isMounted && Array.isArray(data)) {
          setTasks(data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const sortedTasks = useMemo(() => tasks.slice(), [tasks]);

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title || "");
    setEditDescription(task.description || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const saveEdit = () => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== editingId) {
          return task;
        }

        return {
          ...task,
          title: editTitle,
          description: editDescription
        };
      })
    );
    cancelEdit();
  };

  const removeTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }

    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description
        })
      });
      const created = await response.json();
      setTasks((prev) => [...prev, created]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            data-testid="task-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          Description
          <input
            data-testid="task-description"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <button data-testid="add-task" type="submit">
          Add Task
        </button>
      </form>

      <section data-testid="task-list">
        {sortedTasks.map((task) => (
          <article
            key={task.id}
            data-testid="task-item"
            data-title={buildTitleAttribute(task.title)}
          >
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <button
              data-testid="edit-task"
              type="button"
              onClick={() => startEdit(task)}
            >
              Edit
            </button>
            <button
              data-testid="delete-task"
              type="button"
              onClick={() => removeTask(task.id)}
            >
              Delete
            </button>
          </article>
        ))}
      </section>

      {editingId !== null ? (
        <section>
          <h2>Edit Task</h2>
          <label>
            Title
            <input
              data-testid="edit-title"
              type="text"
              value={editTitle}
              onChange={(event) => setEditTitle(event.target.value)}
            />
          </label>
          <label>
            Description
            <input
              data-testid="edit-description"
              type="text"
              value={editDescription}
              onChange={(event) => setEditDescription(event.target.value)}
            />
          </label>
          <button data-testid="save-task" type="button" onClick={saveEdit}>
            Save
          </button>
          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>
        </section>
      ) : null}
    </main>
  );
}
