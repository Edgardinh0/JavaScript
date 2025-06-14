import { fetchData, postData, deleteData } from "./api.js";

const inputs = document.querySelectorAll(".input");
const button = document.querySelector(".button");
const todoList = document.querySelector(".todo_list");
const sortButton = document.querySelector(".sort_button");
const select = document.querySelector(".select_sort_order");
const loader = document.querySelector(".loader");

let todos = [];

const loadTodos = async() => {
    showLoader();
    todos = await fetchData();
    renderTodos(todos);
    hideLoader();
}

const renderTodo = (todo) => {
    const newTodo = document.createElement('div');
    newTodo.dataset.id = todo.id;

    newTodo.insertAdjacentHTML("afterbegin", `
        <h2 class="todo_title">${todo.title}</h2>
        <span class="todo_desc">${todo.description}</span>
        `)

    newTodo.classList.add("new_todo");

    todoList.appendChild(newTodo);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete ToDo";
    deleteButton.classList.add("delete_button");
    newTodo.appendChild(deleteButton);
}

const renderTodos = () => {
    todoList.innerHTML = '';
    todos.forEach((todo) => renderTodo(todo));
}

const handleClick = async (event) => {
    const title = inputs[0].value;
    const desc = inputs[1].value;

    const newTodo = {
        title: title,
        description: desc,
    }

    await postData(newTodo);


    loadTodos();

    inputs[0].value = '';
    inputs[1].value = '';
}

const handleDelete = async(event) => {
    showLoader();
    if (event.target.tagName == "BUTTON") {

        const itemId = event.target.closest(".new_todo").dataset.id;

        await deleteData(itemId);

        event.target.closest(".new_todo").remove();

        const newTodos = todos.filter(item => item.id != itemId);
        todos = newTodos;
    }
    hideLoader();
}

const sortDirectionMap = {
    "asc": 1,
    "desc": -1
}

const handleSort = (event, param) => {
    showLoader();
    todos.sort((a,b) => a.title.localeCompare(b.title) * param);

    todoList.innerHTML = '';
    renderTodos();
    hideLoader();   
}

const showLoader = () => {
    loader.style.display = 'block';
    button.disabled = true;
    sortButton.disabled = true;
    todoList.style.opacity = 0.3;
}

const hideLoader = () => {
    loader.style.display = 'none';
    button.disabled = false;
    sortButton.disabled = false;
    todoList.style.opacity = 1;
}

button.addEventListener("click", handleClick);

todoList.addEventListener("click", handleDelete);

sortButton.addEventListener("click", (event) => handleSort(event, sortDirectionMap[select.value]));

loadTodos();