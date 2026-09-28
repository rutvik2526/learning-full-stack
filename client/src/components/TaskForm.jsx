import { useState } from "react";

function TaskForm({ onAddTask }) {
    const [title, setTitle] = useState("");
    const [project, setProject] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (title.trim() === "") {
            setError("Title is required.");
            return;
        }

        const newTask = {
            id: Date.now(),
            title: title.trim(),
            project: project.trim(),
            status: "Pending",
            dueDate: ""
        };

        onAddTask(newTask);

        setTitle("");
        setProject("");
        setError("");
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
                <label htmlFor="taskProject">
                    Project
                </label>

                <input
                    id="taskProject"
                    type="text"
                    value={project}
                    onChange={function (event) {
                        setProject(event.target.value);
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