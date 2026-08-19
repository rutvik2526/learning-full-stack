function isValidTaskTitle(title) {
    if (typeof title !== 'string') {
        return false;
    }

    else if (title.trim() == ""){
        return false;
    }
    else if(title.length >= 80 && title.length <= 0){
        return false;        
}

    else{
        return true;
}
}

console.log(isValidTaskTitle("Buy groceries")); // true
console.log(isValidTaskTitle(""));



