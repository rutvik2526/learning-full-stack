import { useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Learn React",
            project: "Learning",
            status: "Incomplete",
            dueDate: "2026-09-10"
        },
        {
            id: 2,
            title: "Practice Components",
            project: "React Project",
            status: "Incomplete",
            dueDate: ""
        },
        {
            id: 3,
            title: "Read API Guide",
            project: "Learning",
            status: "Completed",
            dueDate: "2026-09-12"
        }
    ]);

    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    function addTask(newTask) {
        setTasks(function (currentTasks) {
            return [...currentTasks, newTask];
        });
    }

    const visibleTasks = tasks.filter(function (task) {
        const matchesSearch = task.title
            .toLowerCase()
            .includes(searchText.toLowerCase());

        const matchesStatus =
            statusFilter === "All" ||
            task.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div>
            <Header />

            <TaskForm onAddTask={addTask} />

            <div>
                <label>Search: </label>

                <input
                    type="text"
                    value={searchText}
                    onChange={function (event) {
                        setSearchText(event.target.value);
                    }}
                    placeholder="Search tasks"
                />
            </div>

            <div>
                <label>Status: </label>

                <select
                    value={statusFilter}
                    onChange={function (event) {
                        setStatusFilter(event.target.value);
                    }}
                >
                    <option value="All">All</option>
                    <option value="Incomplete">Incomplete</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            {visibleTasks.length === 0 ? (
                <p>
                    No tasks match your current search and status filter.
                </p>
            ) : (
                <TaskList tasks={visibleTasks} />
            )}
        </div>
    );
}

export default App;