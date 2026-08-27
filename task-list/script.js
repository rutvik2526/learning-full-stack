// ==========================================
// STATE
// ==========================================

let tasks = [];


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const taskForm = document.getElementById("taskForm");

const taskInput = document.getElementById("taskInput");

const errorMessage = document.getElementById("errorMessage");

const loadingMessage = document.getElementById("loadingMessage");

const apiErrorMessage = document.getElementById("apiErrorMessage");

const taskList = document.getElementById("taskList");


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
// LOAD TASKS FROM LOCAL STORAGE
// ==========================================

function loadSavedTasks() {

    const savedTasks = localStorage.getItem("tasks");


    if (savedTasks === null) {

        return false;

    }


    try {

        tasks = JSON.parse(savedTasks);

        return true;

    } catch (error) {

        console.log("Saved task data is invalid.");

        return false;

    }

}


// ==========================================
// RENDER TASKS
// ==========================================

function renderTasks() {

    taskList.innerHTML = "";


    for (let i = 0; i < tasks.length; i++) {

        const task = tasks[i];


        // Create list item

        const li = document.createElement("li");


        // Create title

        const title = document.createElement("span");

        title.textContent = task.title;


        // Check completed state

        if (task.completed) {

            title.classList.add("completed");

        }


        // Create Complete button

        const completeButton = document.createElement("button");


        if (task.completed) {

            completeButton.textContent = "Completed";

        } else {

            completeButton.textContent = "Complete";

        }


        // Complete button event

        completeButton.addEventListener("click", function () {

            task.completed = !task.completed;

            saveTasks();

            renderTasks();

        });


        // Add title

        li.appendChild(title);


        // Add button

        li.appendChild(completeButton);


        // Add task to list

        taskList.appendChild(li);

    }

}


// ==========================================
// FETCH TASKS
// ==========================================

async function fetchTasks() {

    // Show loading state

    loadingMessage.textContent = "Loading tasks...";

    loadingMessage.style.display = "block";


    // Hide old error

    apiErrorMessage.textContent = "";

    apiErrorMessage.style.display = "none";


    try {

        // Fetch mock JSON file

        const response = await fetch("tasks.json");


        // Check HTTP response

        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );

        }


        // Convert response to JavaScript data

        const data = await response.json();


        // Put fetched data into state

        tasks = data;


        // Save fetched tasks

        saveTasks();


        // Hide loading message

        loadingMessage.style.display = "none";


        // Show tasks

        renderTasks();

    }


    catch (error) {

        // Hide loading message

        loadingMessage.style.display = "none";


        // Show error

        apiErrorMessage.textContent =
            `Failed to load tasks: ${error.message}`;

        apiErrorMessage.style.display = "block";

    }

}


// ==========================================
// ADD NEW TASK
// ==========================================

taskForm.addEventListener("submit", function (event) {

    // Stop page reload

    event.preventDefault();


    // Get input value

    const title = taskInput.value.trim();


    // Check blank title

    if (title === "") {

        errorMessage.textContent =
            "Please enter a task title.";

        return;

    }


    // Remove validation error

    errorMessage.textContent = "";


    // Create new task

    const newTask = {

        id: Date.now(),

        title: title,

        createdDate:
            new Date().toISOString().slice(0, 10),

        dueDate: "",

        completed: false

    };


    // Add task to state

    tasks.push(newTask);


    // Save state

    saveTasks();


    // Render updated list

    renderTasks();


    // Clear input

    taskInput.value = "";

});


// ==========================================
// START APPLICATION
// ==========================================

async function startApp() {

    // First check localStorage

    const hasSavedTasks = loadSavedTasks();


    if (hasSavedTasks) {

        // Saved data exists

        loadingMessage.style.display = "none";

        renderTasks();

    } else {

        // No saved data

        await fetchTasks();

    }

}


startApp();