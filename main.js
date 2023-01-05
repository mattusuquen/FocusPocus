//MODEL

let category_textbox = document.getElementById('category_textbox');
let add_category = document.getElementById('add_category');

let category_flexbox = document.getElementById('category_flexbox');

let categories;

const savedCategories = JSON.parse(localStorage.getItem("categories"));

if(Array.isArray(savedCategories)) categories = savedCategories;
else categories = Array(0);

render();

function createCategory(name, textbox){
    categories.push({
        name: name,
        id: -1,
        tasks: Array(0),
        textbox: textbox});

    saveCategories();
}

function deleteCategory(id){
    categories = categories.filter(function(category){ return category.id != id; });

    saveCategories();
}


function createTask(category){
    let name = category.textbox.value;

    if(name.length == 0) return;

    category.tasks.push({name: name,
                         id: -1,
                         status: false});

    resetTaskTextbox(category.textbox);

    saveCategories();
}

function deleteTask(categoryId,idToDelete){
    let category = categories.find(category => category.id == categoryId);

    category.tasks = category.tasks.filter(function(task){return task.id !== idToDelete});
    
    saveCategories();
}

function saveCategories(){
    localStorage.setItem("categories", JSON.stringify(categories));
}

function setTaskStatus(task, status){task.status = status;}

//VISUAL

function render(){
    //CLEAR CATEGORY FLEXBOX
    category_flexbox.innerHTML = '';
    let amtOfCateg = 0;

    categories.forEach(function(category){
        //ASSIGN CATEGORY ID
        category.id = amtOfCateg++;

        renderCategory(category);
    });

}

function renderCategory(category){
    let category_container = document.createElement('div');
    let category_name = document.createElement('div');
    let remove_category = document.createElement('button');
    let task_inputs = document.createElement('div');
    let task_textbox = document.createElement('input');
    let add_task = document.createElement('button');

    category_container.classList.add('category_container');
    category_name.classList.add('category_name');
    remove_category.classList.add('remove_category');
    task_inputs.classList.add('task_inputs');
    task_textbox.classList.add('task_textbox');
    add_task.classList.add('add_task');

    category_name.innerHTML = category.name;
    remove_category.innerHTML = '-';
    task_textbox.placeholder = 'Enter Task Name';
    add_task.innerHTML = '+';

    category_flexbox.append(category_container);
    category_name.append(remove_category);
    category_container.append(category_name); 
    category_container.append(task_inputs);
    task_inputs.append(task_textbox);
    task_inputs.append(add_task);

    category_container.id = category.id;
    category.textbox = task_textbox;

    remove_category.onclick = removeCategory;
    add_task.onclick = addTask;
    let amtOfTasks = 0;
    category.tasks.forEach(task => {task.id = category.id+' '+amtOfTasks++; 
                                    renderTask(category_container, task)});
}

function renderTask(container, task){
    let task_container = document.createElement('div');
    let task_name = document.createElement('div');
    let checkbox = document.createElement('input');
    let remove_task = document.createElement('button');

    checkbox.type = 'checkbox';
    checkbox.onchange = toggleTask;

    task_container.classList.add('task_container');
    task_name.classList.add('task_name');
    remove_task.classList.add('remove_task');

    if(task.status == true){
        checkbox.checked = true;
        task_name.innerHTML = '<strike>'+task.name+'</strike>';
    } else {
        checkbox.checked = false;
        task_name.innerHTML = task.name;
    }
    remove_task.innerHTML = '-';

    task_container.append(checkbox);
    task_container.append(task_name);
    task_container.append(remove_task);

    task_container.id = task.id;

    container.append(task_container);

    remove_task.onclick = removeTask;
}

function resetCategTextbox(){
    category_textbox.value = '';
}

function resetTaskTextbox(textbox){
    textbox.value = '';
}

//CONTROLLER

add_category.addEventListener('click', function(){addCategory(category_textbox.value)}, false);

category_textbox.addEventListener('keyup', function(event){
    if(event.key === 'Enter') add_category.click();
});

function addCategory(name){
    //IF NOT CATEGORY NAME INPUTTED THEN ALERT USER
    if(name.length == 0){
        alert('Please Enter a Category Name.');
        return;
    }

    //ADD CATEGORY TO ARRAY
    createCategory(name);

    //RESET TEXTBOX
    resetCategTextbox();
    
    render();
}

function removeCategory(event){
    //FIND TARGET ID TO REMOVE
    let deleteButton = event.target;
    let categoryContainer = deleteButton.parentElement.parentElement;
    let idToDelete = categoryContainer.id;

    //DELETE CATEGORY FROM ARRAY
    deleteCategory(idToDelete);

    render();
}

function addTask(event){
    let addButton = event.target;
    let categoryContainer = addButton.parentElement.parentElement;
    let idToAdd = categoryContainer.id;
    let category = categories.find(category => category.id == idToAdd);

    if(category == null) alert('Category of id:'+idToAdd+' does not exist');
    else createTask(category);

    render();
}

function removeTask(event){
    let deleteButton = event.target;
    let categoryId = deleteButton.parentElement.parentElement.id;
    let idToDelete = deleteButton.parentElement.id;

    deleteTask(categoryId,idToDelete);

    render();
}

function toggleTask(event){
    let checkbox = event.target;
    let taskId = checkbox.parentElement.id;
    let categoryId = checkbox.parentElement.parentElement.id;
    let category = categories.find(category => category.id == categoryId);
    let task = category.tasks.find(task => task.id === taskId);

    setTaskStatus(task,checkbox.checked);
    render();
}