import { useState } from "react";
import Header from "./components/Header";
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

    return (
        <div>
            <Header />
            <TaskList tasks={tasks} />
        </div>
    );
}

export default App;