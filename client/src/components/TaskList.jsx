import TaskItem from "./TaskItem";

function TaskList({ tasks, onEdit, onDelete }) {
    return (
        <ul>
            {tasks.map(function (task) {
                return (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                );
            })}
        </ul>
    );
}

export default TaskList;