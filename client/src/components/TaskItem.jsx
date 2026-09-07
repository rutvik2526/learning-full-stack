function TaskItem({ task }) {
    return (
        <li>
            <h3>{task.title}</h3>

            <p>Project: {task.project}</p>

            <p>Status: {task.status}</p>

            <p>
                Due Date:{" "}
                {task.dueDate ? task.dueDate : "No due date"}
            </p>
        </li>
    );
}

export default TaskItem;