let tasks = [];


const taskForm = document.getElementById("taskForm");

const taskInput = document.getElementById("taskInput");

const errorMessage = document.getElementById("errorMessage");

const loadingMessage = document.getElementById("loadingMessage");

const apiErrorMessage = document.getElementById("apiErrorMessage");

const taskList = document.getElementById("taskList");



function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


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

function renderTasks() {

    taskList.innerHTML = "";


    for (let i = 0; i < tasks.length; i++) {

        const task = tasks[i];


        // Create list item

        const li = document.createElement("li");


        // Create title

        const title = document.createElement("span");

        title.textContent = task.title;


        

        if (task.completed) {

            title.classList.add("completed");

        }


        
        const completeButton = document.createElement("button");


        if (task.completed) {

            completeButton.textContent = "Completed";

        } else {

            completeButton.textContent = "Complete";

        }


        completeButton.addEventListener("click", 
        function () {

                task.completed = !task.completed;

                saveTasks();

                renderTasks();

            });

        li.appendChild(title);


        li.appendChild(completeButton);


        taskList.appendChild(li);

    }

}


async function fetchTasks() {


    loadingMessage.textContent = "Loading tasks...";

    loadingMessage.style.display = "block";



    apiErrorMessage.textContent = "";

    apiErrorMessage.style.display = "none";


    try {

        
        const response = await fetch("tasks.json");


        

        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );

        }


        
        const data = await response.json();


        

        tasks = data;


        

        saveTasks();


        

        loadingMessage.style.display = "none";


        // Show tasks

        renderTasks();

    }


    catch (error) {

        

        loadingMessage.style.display = "none";


        apiErrorMessage.textContent =
            `Failed to load tasks: ${error.message}`;

        apiErrorMessage.style.display = "block";

    }

}

taskForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const title = taskInput.value.trim();


    if (title === "") {

        errorMessage.textContent =
            "Please enter a task title.";

        return;

    }


    errorMessage.textContent = "";


    const newTask = {

        id: Date.now(),

        title: title,

        createdDate:
            new Date().toISOString().slice(0, 10),

        dueDate: "",

        completed: false

    };


    tasks.push(newTask);

    saveTasks();


    renderTasks();

    taskInput.value = "";

});


async function startApp() {


    const hasSavedTasks = loadSavedTasks();


    if (hasSavedTasks) {


        loadingMessage.style.display = "none";

        renderTasks();

    } else {


        await fetchTasks();

    }

}


startApp();