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
            status: "Incomplete",
            dueDate: ""
        };

        onAddTask(newTask);

        setTitle("");
        setProject("");
        setError("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>

                <input
                    type="text"
                    value={title}
                    onChange={function (event) {
                        setTitle(event.target.value);
                    }}
                    placeholder="Enter task title"
                />

                {error && <p>{error}</p>}
            </div>

            <div>
                <label>Project</label>

                <input
                    type="text"
                    value={project}
                    onChange={function (event) {
                        setProject(event.target.value);
                    }}
                    placeholder="Enter project"
                />
            </div>

            <button type="submit">Add Task</button>
        </form>
    );
}

export default TaskForm;