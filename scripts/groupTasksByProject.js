const tasks = [
    { id: 1, title: "Login page", projectId: 1 },
    { id: 2, title: "Database setup", projectId: 2 },
    { id: 3, title: "Navbar", projectId: 1 },
    { id: 4, title: "API setup", projectId: 2 }
];

function groupTasksByProject(tasks) {
    const groups = {};

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const projectId = task.projectId;

        if (!groups[projectId]) {
            groups[projectId] = [];
        }

        groups[projectId].push(task);
    }

    return groups;
}

const before = JSON.stringify(tasks);

const groupedTasks = groupTasksByProject(tasks);

const after = JSON.stringify(tasks);

console.log("Grouped tasks:");
console.log(groupedTasks);

console.log("Original array unchanged:", before === after);