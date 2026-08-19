function isValidTaskTitle(title) {
    return typeof title === "string" &&
        title.trim().length > 0 &&
        title.length <= 80;
}

console.log(isValidTaskTitle("Buy groceries")); // true
console.log(isValidTaskTitle(""));              // false
console.log(isValidTaskTitle("   "));            // false
console.log(isValidTaskTitle("a".repeat(81)));   // false