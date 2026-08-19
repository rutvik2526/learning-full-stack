function summarizeTasks(tasks) {
  const total = tasks.length;

  const completed = tasks.filter(task => task.completed).length;

  const incomplete = tasks.filter(task => !task.completed).length;

  const overdue = tasks.filter(task => {
    if (!task.dueDate || task.completed) {
      return false;
    }

    return new Date(task.dueDate) < new Date();
  }).length;

  return {
    total,
    completed,
    incomplete,
    overdue
  };
}


// Test data - at least 6 tasks
const tasks = [
  { title: "Buy groceries", completed: true, dueDate: "2026-08-15" },
  { title: "Finish assignment", completed: true, dueDate: "2026-08-20" },
  { title: "Go to gym", completed: false, dueDate: "2026-08-10" },
  { title: "Read book", completed: false, dueDate: "2026-08-25" },
  { title: "Clean room", completed: true },
  { title: "Pay bill", completed: false, dueDate: "2026-08-30" }
];


// Show input and result
console.log("Tasks:", tasks);
console.log("Summary:", summarizeTasks(tasks));


// Edge case: empty list
console.assert(
  summarizeTasks([]).total === 0,
  "Empty list should return total 0"
);


// Edge case: tasks without due dates
const noDueDateTasks = [
  { title: "Task 1", completed: false },
  { title: "Task 2", completed: true }
];

console.assert(
  summarizeTasks(noDueDateTasks).overdue === 0,
  "Missing due dates should not be overdue"
);


// Edge case: future and past due dates
const dateTasks = [
  { title: "Past task", completed: false, dueDate: "2026-08-10" },
  { title: "Future task", completed: false, dueDate: "2026-08-30" }
];

console.assert(
  summarizeTasks(dateTasks).overdue === 1,
  "Only past incomplete task should be overdue"
);