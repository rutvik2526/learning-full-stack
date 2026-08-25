const tasks = [
    {
        title: "Learn JavaScript",
        completed: true
    },
    {
        title: "Practice DOM",
        completed: false
    },
    {
        title: "Build Task List",
        completed: false
    }
];

function renderTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.textContent = task.title;

        taskList.appendChild(li);

    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
});