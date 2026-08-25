// This is our state array
const tasks = [
    {
        id: 1,
        title: "Learn arrays",
        createdDate: "2026-08-20",
        dueDate: "2026-08-25"
    },
    {
        id: 2,
        title: "Practice JavaScript",
        createdDate: "2026-08-21",
        dueDate: "2026-08-26"
    },
    {
        id: 3,
        title: "Read documentation",
        createdDate: "2026-08-22",
        dueDate: "2026-08-27"
    }
];


// Get HTML elements
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const errorMessage = document.getElementById("errorMessage");
const taskList = document.getElementById("taskList");


// Function to display all tasks
function renderTasks() {

    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {

        const task = tasks[i];

        const li = document.createElement("li");

        li.textContent = task.title;

        taskList.appendChild(li);
    }
}


// Form submit event listener
taskForm.addEventListener("submit", function(event) {

    // Stop the browser from reloading the page
    event.preventDefault();


    // Get the input value and remove extra spaces
    const title = taskInput.value.trim();


    // Check for blank title
    if (title === "") {

        errorMessage.textContent = "Please enter a task title.";

        return;
    }


    // Remove any previous error message
    errorMessage.textContent = "";


    // Create a new task
    const newTask = {
        id: Date.now(),
        title: title,
        createdDate: new Date().toISOString().slice(0, 10),
        dueDate: ""
    };


    // Add the new task to the state array
    tasks.push(newTask);


    // Display the updated task list
    renderTasks();


    // Clear the input box
    taskInput.value = "";

});


// Display existing tasks when the page loads
renderTasks();