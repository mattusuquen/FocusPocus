//MODEL
let categories = Array(0);
let amtOfCateg = 0;


let category_textbox = document.getElementById('category_textbox');
let add_category = document.getElementById('add_category');

let category_flexbox = document.getElementById('category_flexbox');

function createCategory(){
    categories.push({name: name,
        id: -1,
       tasks: Array(0)});
}

function deleteCategory(id){
    categories = categories.filter(function(categories){
        return categories.id != id;
    });
}

//VISUAL

function render(){
    //CLEAR CATEGORY FLEXBOX
    category_flexbox.innerHTML = '';
    amtOfCateg = 0;

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
    let add_task

    category_container.classList.add('category_container');
    category_name.classList.add('category_name');
    remove_category.classList.add('remove_category');

    category_name.innerHTML = category.name;
    remove_category.innerHTML = '-';

    category_flexbox.append(category_container);
    category_name.append(remove_category);
    category_container.append(category_name); 

    remove_category.id = category.id;

    remove_category.onclick = removeCategory;
}

function resetCategTextbox(){
    category_textbox.value = '';
}

//CONTROLLER
add_category.addEventListener('click', function(){addCategory(category_textbox.value)}, false);

function addCategory(name){
    //IF NOT CATEGORY NAME INPUTTED THEN ALERT USER
    if(name.length == 0){
        alert('Please Enter a Category Name.');
        return;
    }

    //ADD CATEGORY TO ARRAY
    createCategory();

    //RESET TEXTBOX
    resetCategTextbox();
    
    render();
}

function removeCategory(event){
    //FIND TARGET ID TO REMOVE
    let deleteButton = event.target;
    let idToDelete = deleteButton.id;

    //DELETE CATEGORY FROM ARRAY
    deleteCategory(idToDelete);

    render();
}