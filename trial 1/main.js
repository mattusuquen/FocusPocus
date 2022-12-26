let addCategory = document.getElementById("addCategory");
let categoryContainer = document.getElementById("categoryContainer");
let categoryInputField = document.getElementById("categoryInputField");
let addTask = document.getElementById("addTask");
let taskContainer = document.getElementById("taskContainer");
let taskInputField = document.getElementById("taskInputField");

addCategory.addEventListener('click', function(){
    if(categoryInputField.value == "") return;

    var category = document.createElement('div');
    category.classList.add("category-styling");

    var header = document.createElement('h2');
    header.innerText = categoryInputField.value;
    categoryInputField.value = "";
    category.appendChild(header);
    catergoryContainer.appendChild(category);

    var taskInputField = document.createElement("input");
    taskInputField.setAttribute("type", "text");
    var addTask = document.createElement("input");
    addTask.setAttribute("type", "button");
    addTask.innerText = "+"
    category.appendChild(taskInputField);
    category.appendChild(addTask);

    var task = document.createElement('div');
    task.innerText = taskInputField.value;
    
});
