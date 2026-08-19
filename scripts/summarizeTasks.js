const tasks = [
    {title : "Complete the project documentation",
     completed: false,
     dueDate: "2026-08-15",
     description: "Write detailed documentation for the project, including setup instructions and API references."
    },

    {title : "Buy groceries",
     completed: true,
     dueDate: "2026-08-10",
     description: "Purchase milk, eggs, bread, and fruits from the local supermarket."
    },

    {title : "Schedule dentist appointment",
     completed: false,
     dueDate: "2026-08-20",
     description: "Call the dentist's office to schedule a routine check-up and cleaning."
    },      

    {title : "Plan weekend getaway",
     completed: false,
     dueDate: "2026-08-18",
     description: "Research and book accommodations for a weekend trip to the mountains."
    },      

    {title : "Organize home office",
     completed: true,
     dueDate: "2026-08-12",
     description: "Declutter and organize the home office space for better productivity."
    },

    {title : "Prepare presentation slides",
     completed: false,
     dueDate: "2026-08-22",
     description: "Create slides for the upcoming team meeting, focusing on project updates and milestones."
    
    },

    {title : "Update software",
     completed: true,
     dueDate: "2026-08-14",
     description: "Install the latest updates for all software applications on the work computer."
    },

    {title : "Clean the garage",
     completed: false,
     dueDate: "2026-08-19",
     description: "Sort and clean the garage, disposing of unnecessary items and organizing tools."
    },
]

// Returns: { total, completed, incomplete, overdue }
function summarizeTasks(tasks, today = new Date()) {
    const todayString = today.toISOString().slice(0, 10);
    const completedTasks = tasks.filter(task => task.completed);
    const incompleteTasks = tasks.filter(task => !task.completed);
    const overdueTasks = incompleteTasks.filter(task =>
        task.dueDate && task.dueDate < todayString
    );

    return {
        total: tasks.length,
        completed: completedTasks.length,
        incomplete: incompleteTasks.length,
        overdue: overdueTasks.length
    };
}

console.log(summarizeTasks(tasks, new Date("2026-08-16")));
console.log(summarizeTasks(tasks, new Date("2026-08-21")));
console.log(summarizeTasks(tasks, new Date("2026-08-10")));
console.log(summarizeTasks(tasks, new Date("2026-08-25")));

