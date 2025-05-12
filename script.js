import { fetchData, todos } from "./api.js";

const inputs = document.querySelectorAll(".input");
const button = document.querySelector(".button");
const todoList = document.querySelector(".todo_list");
const sortButton = document.querySelector(".sort_button");
const select = document.querySelector(".select_sort_order");

let todoArray;

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
    todoArray.forEach((todo) => renderTodo(todo));
}

const renderTodosInitial = () => {
    todoList.innerHTML = '';
    todoArray = todos;
    todos.forEach((todo) => renderTodo(todo))
}

const handleClick = async (event) => {
    const title = inputs[0].value;
    const desc = inputs[1].value;

    let lastId;

    if (todoArray.length == 0) {
        lastId = 0;
    }
    else {
        lastId = todoArray.reduce((max, todo) => (Number(todo.id) > max ? max = todo.id : max), Number(todoArray[0].id));
    }

    const newTodo = {
        title: title,
        description: desc,
        createdAt: Date.now(),
        done: false,
        id: Number(lastId) + 1
    }

    try {
        const data = await fetch("https://6709508caf1a3998baa11eb3.mockapi.io/api/v1/todos", {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {
                'Content-Type': 'application/json'
            }   
        })
    } catch(err) {
        console.log(err);
    }

    todoArray.push(newTodo);

    handleSort(event, sortDirectionMap[select.value]);

    renderTodos();

    inputs[0].value = '';
    inputs[1].value = '';

    console.log(todoArray);
}

const handleDelete = async(event) => {
    if (event.target.tagName == "BUTTON") {

        const itemId = event.target.closest(".new_todo").dataset.id;

        try {
        await fetch(`https://6709508caf1a3998baa11eb3.mockapi.io/api/v1/todos/${itemId} `, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }   
        })
        event.target.closest(".new_todo").remove();
        } catch(err) {
            console.log(err);
        }

        const newTodos = todoArray.filter(item => item.id != itemId);
        todoArray = newTodos;
        console.log(todoArray);
    } 
}

const sortDirectionMap = {
    "asc": 1,
    "desc": -1
}

const handleSort = (event, param) => {

    todoArray.sort((a,b) => a.title.localeCompare(b.title) * param);

    todoList.innerHTML = '';
    renderTodos();
}



button.addEventListener("click", handleClick);

todoList.addEventListener("click", handleDelete);

sortButton.addEventListener("click", (event) => handleSort(event, sortDirectionMap[select.value]));

fetchData().then(() => renderTodosInitial());


//лейблы сортировка при добавлением, сортировка через select, все запросы перенести в отдельный скрипт и сделать модулем