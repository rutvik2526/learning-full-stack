import { useEffect, useRef, useState } from "react";
import Header from "./components/header";
import TaskForm from "./components/TaskForm";
import TaskEditForm from "./components/TaskEditForm";
import TaskList from "./components/TaskList";

function App() {
    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [mutationError, setMutationError] = useState("");

    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [draft, setDraft] = useState(null);

    const [deleteTaskId, setDeleteTaskId] = useState(null);

    const searchInputRef = useRef(null);

    useEffect(function () {
        fetch("http://localhost:5000/api/tasks")
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Failed to load tasks.");
                }

                return response.json();
            })
            .then(function (data) {
                setTasks(data);
                setLoading(false);
            })
            .catch(function () {
                setError(
                    "Unable to load tasks. Please make sure the server is running."
                );
                setLoading(false);
            });
    }, []);

    async function addTask(newTask) {
        setMutationError("");

        try {
            const response = await fetch(
                "http://localhost:5000/api/tasks",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: newTask.title,
                        projectId: newTask.projectId
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to create task."
                );
            }

            setTasks(function (currentTasks) {
                return [...currentTasks, data];
            });

            return true;
        } catch (error) {
            setMutationError(error.message);
            return false;
        }
    }

    function startEditing(task) {
        setSelectedTaskId(task.id);
        setDraft({ ...task });
        setMutationError("");
    }

    async function saveEdit(updatedTask) {
        setMutationError("");

        try {
            const response = await fetch(
                `http://localhost:5000/api/tasks/${updatedTask.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: updatedTask.title,
                        projectId: updatedTask.projectId,
                        completed: updatedTask.completed
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to update task."
                );
            }

            setTasks(function (currentTasks) {
                return currentTasks.map(function (task) {
                    if (task.id === data.id) {
                        return data;
                    }

                    return task;
                });
            });

            setSelectedTaskId(null);
            setDraft(null);

            return true;
        } catch (error) {
            setMutationError(error.message);
            return false;
        }
    }

    function cancelEdit() {
        setSelectedTaskId(null);
        setDraft(null);
    }

    function requestDelete(taskId) {
        setDeleteTaskId(taskId);
        setMutationError("");
    }

    function cancelDelete() {
        setDeleteTaskId(null);
    }

    async function confirmDelete() {
        setMutationError("");

        try {
            const response = await fetch(
                `http://localhost:5000/api/tasks/${deleteTaskId}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to delete task."
                );
            }

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
        } catch (error) {
            setMutationError(error.message);
        }
    }

    const visibleTasks = tasks.filter(function (task) {
        const search = searchText.trim().toLowerCase();

        const matchesSearch =
            search === "" ||
            task.title.toLowerCase().includes(search) ||
            String(task.projectId).includes(search);

        const matchesStatus =
            statusFilter === "All" ||
            (statusFilter === "Completed" &&
                task.completed === true) ||
            (statusFilter === "Incomplete" &&
                task.completed === false);

        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div>
                <Header />

                <p>Loading tasks...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Header />

                <p role="alert">{error}</p>
            </div>
        );
    }

    return (
        <div>
            <Header />

            {mutationError && (
                <p role="alert">
                    {mutationError}
                </p>
            )}

            <TaskForm onAddTask={addTask} />

            <section>
                <h2>Task Filters</h2>

                <div>
                    <label htmlFor="searchInput">
                        Search tasks
                    </label>

                    <input
                        ref={searchInputRef}
                        id="searchInput"
                        type="text"
                        value={searchText}
                        onChange={function (event) {
                            setSearchText(event.target.value);
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="statusFilter">
                        Filter by status
                    </label>

                    <select
                        id="statusFilter"
                        value={statusFilter}
                        onChange={function (event) {
                            setStatusFilter(event.target.value);
                        }}
                    >
                        <option value="All">
                            All statuses
                        </option>

                        <option value="Incomplete">
                            Incomplete
                        </option>

                        <option value="Completed">
                            Completed
                        </option>
                    </select>
                </div>
            </section>

            {selectedTaskId !== null && draft && (
                <TaskEditForm
                    draft={draft}
                    onSave={saveEdit}
                    onCancel={cancelEdit}
                />
            )}

            {deleteTaskId !== null && (
                <section aria-labelledby="deleteConfirmationTitle">
                    <h2 id="deleteConfirmationTitle">
                        Confirm task deletion
                    </h2>

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
                        Cancel Delete
                    </button>
                </section>
            )}

            {visibleTasks.length === 0 ? (
                <p>
                    {searchText.trim() !== "" &&
                    statusFilter !== "All"
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