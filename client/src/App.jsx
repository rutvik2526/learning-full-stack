import { useRef, useState } from "react";
import Header from "./components/header";
import TaskForm from "./components/TaskForm";
import TaskEditForm from "./components/TaskEditForm";
import TaskList from "./components/TaskList";

function App() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Learn React",
            project: "Learning",
            status: "In Progress",
            dueDate: "2026-09-10"
        },
        {
            id: 2,
            title: "Practice Components",
            project: "React Project",
            status: "Pending",
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

    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [draft, setDraft] = useState(null);

    const [deleteTaskId, setDeleteTaskId] = useState(null);

    const searchInputRef = useRef(null);

    function addTask(newTask) {
        setTasks(function (currentTasks) {
            return [...currentTasks, newTask];
        });
    }

    function startEditing(task) {
        setSelectedTaskId(task.id);
        setDraft({ ...task });
    }

    function saveEdit(updatedTask) {
        setTasks(function (currentTasks) {
            return currentTasks.map(function (task) {
                if (task.id === updatedTask.id) {
                    return updatedTask;
                }

                return task;
            });
        });

        setSelectedTaskId(null);
        setDraft(null);
    }

    function cancelEdit() {
        setSelectedTaskId(null);
        setDraft(null);
    }

    function requestDelete(taskId) {
        setDeleteTaskId(taskId);
    }

    function cancelDelete() {
        setDeleteTaskId(null);
    }

    function confirmDelete() {
        setTasks(function (currentTasks) {
            return currentTasks.filter(function (task) {
                return task.id !== deleteTaskId;
            });
        });

        setDeleteTaskId(null);

        setTimeout(function () {
            if (searchInputRef.current) {
                searchInputRef.current.focus();
            }
        }, 0);
    }

    const visibleTasks = tasks.filter(function (task) {
        const search = searchText.trim().toLowerCase();

        const matchesSearch =
            search === "" ||
            task.title.toLowerCase().includes(search) ||
            task.project.toLowerCase().includes(search);

        const matchesStatus =
            statusFilter === "All" ||
            (statusFilter === "Incomplete" &&
                task.status !== "Completed") ||
            task.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div>
            <Header />

            <TaskForm onAddTask={addTask} />

            <div>
                <label htmlFor="searchInput">
                    Search
                </label>

                <input
                    ref={searchInputRef}
                    id="searchInput"
                    type="text"
                    value={searchText}
                    onChange={function (event) {
                        setSearchText(event.target.value);
                    }}
                    placeholder="Search tasks"
                />
            </div>

            <div>
                <label htmlFor="statusFilter">
                    Status
                </label>

                <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={function (event) {
                        setStatusFilter(event.target.value);
                    }}
                >
                    <option value="All">All</option>
                    <option value="Incomplete">Incomplete</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Pending">Pending</option>
                </select>
            </div>

            {selectedTaskId !== null && draft && (
                <TaskEditForm
                    draft={draft}
                    onSave={saveEdit}
                    onCancel={cancelEdit}
                />
            )}

            {deleteTaskId !== null && (
                <div>
                    <p>
                        Are you sure you want to delete this task?
                    </p>

                    <button
                        type="button"
                        onClick={confirmDelete}
                    >
                        Confirm Delete
                    </button>

                    <button
                        type="button"
                        onClick={cancelDelete}
                    >
                        Cancel
                    </button>
                </div>
            )}

            {visibleTasks.length === 0 ? (
                <p>
                    {searchText.trim() !== "" && statusFilter !== "All"
                        ? `No tasks match "${searchText.trim()}" with ${statusFilter} status.`
                        : searchText.trim() !== ""
                            ? `No tasks match "${searchText.trim()}".`
                            : statusFilter !== "All"
                                ? `No ${statusFilter} tasks found.`
                                : "No tasks found."}
                </p>
            ) : (
                <TaskList
                    tasks={visibleTasks}
                    onEdit={startEditing}
                    onDelete={requestDelete}
                />
            )}
        </div>
    );
}

export default App;