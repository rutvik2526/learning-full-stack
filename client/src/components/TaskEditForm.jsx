import { useState } from "react";

function TaskEditForm({ draft, onSave, onCancel }) {
    const [title, setTitle] = useState(draft.title);
    const [projectId, setProjectId] = useState(
        String(draft.projectId)
    );
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        if (title.trim() === "") {
            setError("Task title is required.");
            return;
        }

        const updatedTask = {
            ...draft,
            title: title.trim(),
            projectId: Number(projectId)
        };

        await onSave(updatedTask);
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
                <label htmlFor="editProjectId">
                    Project ID
                </label>

                <input
                    id="editProjectId"
                    type="number"
                    value={projectId}
                    onChange={function (event) {
                        setProjectId(event.target.value);
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