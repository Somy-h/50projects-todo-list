const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.querySelector(".todo-list");
const todoListItems = document.querySelectorAll(".todo-item");

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodoItem();
});

if (todoListItems) {
    todoListItems.forEach(todoItem => todoAddEventListeners(todoItem));
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

function addTodoItem() {
    let todoText = todoInput.value;

    if (todoText.trim().length > 0) {
        createTodoItemElement(todoText.trim());
    }
    todoInput.value = '';
}

function createTodoItemElement(todoText) {
    const divEl = document.createElement("div");
    divEl.classList.add("todo-item");
    divEl.setAttribute("data-hover", todoText)
    divEl.innerText = todoText;
    todoAddEventListeners(divEl);
    todoList.appendChild(divEl);
}

function toggleComplete(todoItem) {
    todoItem.classList.toggle("completed");
}

function deleteTodoItem(todoItem) {
    todoItem.remove();
}
