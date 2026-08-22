const tasks = [
  {
    title: "Learn JavaScript",
    createdDate: "2026-08-15",
    dueDate: "2026-08-25"
  },
  {
    title: "Build Portfolio",
    createdDate: "2026-08-10",
    dueDate: "2026-08-30"
  },
  {
    title: "Practice Arrays",
    createdDate: "2026-08-18",
    dueDate: null
  },
  {
    title: "Learn Git",
    createdDate: "2026-08-12",
    dueDate: "2026-08-22"
  },
  {
    title: "Create Project",
    createdDate: "2026-08-20",
    dueDate: null
  }
];

function sortTasks(tasks, choice){
    const TaskCopy = [...tasks];
    if (choice === "title") {
        TaskCopy.sort((a, b) => a.title.localeCompare(b.title));
    }

    else if (choice === "createdDate") {
        TaskCopy.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));        
    }

    else if (choice === "dueDate") {
        TaskCopy.sort((a, b) => {
            if (a.dueDate === null && b.dueDate === null) {
                return 0;
            }
            if (a.dueDate === null) {
                return 1;
            }
            if (b.dueDate === null) {
                return -1;
            }
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
    }
    return TaskCopy;
}

// console.log(sortTasks(tasks, "title"));
// console.log(sortTasks(tasks, "createdDate"));
console.log(sortTasks(tasks, "dueDate"));