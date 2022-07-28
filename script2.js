const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.querySelector(".todo-list");
const todoListItems = document.querySelectorAll(".todo-item");


const todoData = loadLocalStorage(); // return array of objects
if (todoData) {
    if (todoData.length === 0) {
        todoInput.focus();
    }
    todoData.forEach((item) => {
        createTodoItemElement(item.text, item.completed);
    });
}

function loadLocalStorage() {
    return JSON.parse(localStorage.getItem("todo-data"));
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodoItem();
});

function addTodoItem() {
    let todoText = todoInput.value;

    if (todoText.trim().length > 0) {
        createTodoItemElement(todoText.trim());
    }
    todoInput.value = '';
}

function createTodoItemElement(todoText, completed = false) {
    const divEl = document.createElement("div");
    divEl.classList.add("todo-item");
    if (completed) divEl.classList.add("completed");
    divEl.innerText = todoText;
    todoAddEventListeners(divEl);
    todoList.appendChild(divEl);
    updateLocalStorage();
}

function todoAddEventListeners(todoItem) {
    todoItem.addEventListener("click", () => {
        toggleComplete(todoItem);
    });
    todoItem.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        deleteTodoItem(todoItem);
    });
}

function toggleComplete(todoItem) {
    todoItem.classList.toggle("completed");
    updateLocalStorage();
}

function deleteTodoItem(todoItem) {
    todoItem.remove();
    updateLocalStorage();
}

function updateLocalStorage() {
    const divEls = document.querySelectorAll(".todo-item");
    const storageObjects = [];

    divEls.forEach(divEl => {
        storageObjects.push( {
                text: divEl.innerText, 
                completed: divEl.classList.contains("completed")   
        })
    });
    localStorage.setItem('todo-data', JSON.stringify(storageObjects));
}
