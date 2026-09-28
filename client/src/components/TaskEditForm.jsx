import { useState } from "react";

function TaskEditForm({ draft, onSave, onCancel }) {
    const [title, setTitle] = useState(draft.title);
    const [project, setProject] = useState(draft.project);
    const [error, setError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (title.trim() === "") {
            setError("Task title is required.");
            return;
        }

        const updatedTask = {
            ...draft,
            title: title.trim(),
            project: project.trim()
        };

        onSave(updatedTask);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Task</h2>

            <div>
                <label htmlFor="editTitle">
                    Task title
                </label>

                <input
                    id="editTitle"
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
                <label htmlFor="editProject">
                    Project
                </label>

                <input
                    id="editProject"
                    type="text"
                    value={project}
                    onChange={function (event) {
                        setProject(event.target.value);
                    }}
                />
            </div>

            <button type="submit">
                Save changes
            </button>

            <button
                type="button"
                onClick={onCancel}
            >
                Cancel editing
            </button>
        </form>
    );
}

export default TaskEditForm;