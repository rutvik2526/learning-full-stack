// ==========================================
// STARTER TASKS
// ==========================================

const starterTasks = [
    {
        id: 1,
        title: "Learn arrays",
        createdDate: "2026-08-20",
        dueDate: "2026-08-25",
        completed: false
    },

    {
        id: 2,
        title: "Practice JavaScript",
        createdDate: "2026-08-21",
        dueDate: "2026-08-26",
        completed: false
    },

    {
        id: 3,
        title: "Read documentation",
        createdDate: "2026-08-22",
        dueDate: "2026-08-27",
        completed: false
    }
];


// ==========================================
// LOAD TASKS FROM LOCAL STORAGE
// ==========================================

let tasks = loadTasks();


function loadTasks() {

    const savedTasks = localStorage.getItem("tasks");


    // No saved tasks
    if (savedTasks === null) {

        return starterTasks;

    }


    // Try to read saved JSON
    try {

        const parsedTasks = JSON.parse(savedTasks);

        return parsedTasks;

    }

    // JSON is broken / malformed
    catch (error) {

        console.log("Saved task data is invalid.");

        return starterTasks;

    }
}


// ==========================================
// SAVE TASKS TO LOCAL STORAGE
// ==========================================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const taskForm = document.getElementById("taskForm");

const taskInput = document.getElementById("taskInput");

const errorMessage = document.getElementById("errorMessage");

const taskList = document.getElementById("taskList");


// ==========================================
// RENDER TASKS
// ==========================================

function renderTasks() {

    // Remove old HTML
    taskList.innerHTML = "";


    // Go through every task
    for (let i = 0; i < tasks.length; i++) {

        const task = tasks[i];


        // Create li
        const li = document.createElement("li");


        // Create title
        const title = document.createElement("span");

        title.textContent = task.title;


        // If task is completed
        if (task.completed) {

            title.classList.add("completed");

        }


        // Create Complete button
        const completeButton = document.createElement("button");


        // Change button text
        if (task.completed) {

            completeButton.textContent = "Completed";

        } else {

            completeButton.textContent = "Complete";

        }


        // ==========================================
        // COMPLETE BUTTON EVENT
        // ==========================================

        completeButton.addEventListener("click", function () {

            // Change only this task
            task.completed = !task.completed;


            // Save changed state
            saveTasks();


            // Show updated list
            renderTasks();

        });


        // Add title to li
        li.appendChild(title);


        // Add button to li
        li.appendChild(completeButton);


        // Add li to task list
        taskList.appendChild(li);

    }
}


// ==========================================
// ADD NEW TASK
// ==========================================

taskForm.addEventListener("submit", function (event) {

    // Stop browser from refreshing
    event.preventDefault();


    // Get input and remove extra spaces
    const title = taskInput.value.trim();


    // ==========================================
    // VALIDATION
    // ==========================================

    if (title === "") {

        errorMessage.textContent =
            "Please enter a task title.";

        return;

    }


    // Remove old error
    errorMessage.textContent = "";


    // ==========================================
    // CREATE NEW TASK
    // ==========================================

    const newTask = {

        id: Date.now(),

        title: title,

        createdDate:
            new Date().toISOString().slice(0, 10),

        dueDate: "",

        completed: false

    };


    // ==========================================
    // ADD TO STATE
    // ==========================================

    tasks.push(newTask);


    // ==========================================
    // SAVE STATE
    // ==========================================

    saveTasks();


    // ==========================================
    // RENDER UPDATED LIST
    // ==========================================

    renderTasks();


    // Clear input
    taskInput.value = "";

});


// ==========================================
// INITIAL RENDER
// ==========================================

renderTasks();