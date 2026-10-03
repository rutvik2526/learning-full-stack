function TaskItem({ task, onEdit, onDelete }) {
    const status = task.completed
        ? "Completed"
        : "Incomplete";

    return (
        <li>
            <h3>{task.title}</h3>

            <p>
                Project ID: {task.projectId}
            </p>

            <p>
                Status: {status}
            </p>

            <button
                type="button"
                onClick={function () {
                    onEdit(task);
                }}
            >
                Edit {task.title}
            </button>

            <button
                type="button"
                onClick={function () {
                    onDelete(task.id);
                }}
            >
                Delete {task.title}
            </button>
        </li>
    );
}

export default TaskItem;