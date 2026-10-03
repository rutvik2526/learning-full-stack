import { useState } from "react";

function TaskForm({ onAddTask }) {
    const [title, setTitle] = useState("");
    const [projectId, setProjectId] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        if (title.trim() === "") {
            setError("Title is required.");
            return;
        }

        const newTask = {
            title: title.trim(),
            projectId: Number(projectId)
        };

        const success = await onAddTask(newTask);

        if (success) {
            setTitle("");
            setProjectId("");
            setError("");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Task</h2>

            <div>
                <label htmlFor="taskTitle">
                    Task title
                </label>

                <input
                    id="taskTitle"
                    type="text"
                    value={title}
                    onChange={function (event) {
                        setTitle(event.target.value);
                        setError("");
                    }}
                />

                {error && (
                    <p role="alert">
                        {error}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="taskProjectId">
                    Project ID
                </label>

                <input
                    id="taskProjectId"
                    type="number"
                    value={projectId}
                    onChange={function (event) {
                        setProjectId(event.target.value);
                    }}
                />
            </div>

            <button type="submit">
                Add Task
            </button>
        </form>
    );
}

export default TaskForm;