import TaskItem from "./TaskItem";

function TaskList({ tasks }) {
    return (
        <ul>
            {tasks.map(function (task) {
                return (
                    <TaskItem
                        key={task.id}
                        task={task}
                    />
                );
            })}
        </ul>
    );
}

export default TaskList;