function TaskItem({ task, onEdit, onDelete }) {
    return (
        <li>
            <h3>{task.title}</h3>

            <p>
                Project: {task.project}
            </p>

            <p>
                Status: {task.status}
            </p>

            <p>
                Due Date:{" "}
                {task.dueDate
                    ? task.dueDate
                    : "No due date"}
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