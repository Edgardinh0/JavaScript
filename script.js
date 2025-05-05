const inputs = document.querySelectorAll(".input");
const button = document.querySelector(".button");
const todoList = document.querySelector(".todo_list");
const sortButtonNormal = document.querySelector(".sort_button_normal");
const sortButtonReverse = document.querySelector(".sort_button_reverse");

let todos = []

const fetchData = async() => {
    try {
        const data = await fetch("https://6709508caf1a3998baa11eb3.mockapi.io/api/v1/todos");
        todos = await data.json();
    } catch (err) {
        console.log(err);
    }
}

const renderTodo = (todo) => {
    const newTodo = document.createElement('div');
    // const todoTitle = document.createElement('h2');
    // const todoDesc = document.createElement('span');

    // todoTitle.innerText = title;
    // todoDesc.innerText = desc;

    // newTodo.appendChild(todoTitle);
    // newTodo.appendChild(todoDesc)

    newTodo.insertAdjacentHTML("afterbegin", `
        <h2 class="todo_title">${todo.title}</h2>
        <span class="todo_desc">${todo.description}</span>
        `)

    newTodo.classList.add("new_todo");
    // todoTitle.classList.add("todo_title")
    // todoDesc.classList.add("todo_desc");

    todoList.appendChild(newTodo);

    deleteButton = document.createElement('button');
    deleteButton.innerText = "PRESS ME";
    deleteButton.classList.add("delete_button");
    newTodo.appendChild(deleteButton);
}

const renderTodos = () => {
    todos.forEach((todo) => renderTodo(todo));
}

const handleClick = async (event) => {
    const title = inputs[0].value;
    const desc = inputs[1].value;

    const newTodo = {
        id: Math.random(),
        title: title,
        description: desc,
        createdAt: Date.now(),
        done: false
    }

    try {
        await fetch("https://6709508caf1a3998baa11eb3.mockapi.io/api/v1/todos", {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {
                'Content-Type': 'application/json'
            }   
        })

        renderTodo(newTodo);
    } catch(err) {
        console.log(err);
    }
   
    // const newTodo = document.createElement('div');
    // // const todoTitle = document.createElement('h2');
    // // const todoDesc = document.createElement('span');

    // // todoTitle.innerText = title;
    // // todoDesc.innerText = desc;

    // // newTodo.appendChild(todoTitle);
    // // newTodo.appendChild(todoDesc)

    // newTodo.insertAdjacentHTML("afterbegin", `
    //     <h2 class="todo_title">${title}</h2>
    //     <span class="todo_desc">${desc}</span>
    //     `)

    // newTodo.classList.add("new_todo");
    // // todoTitle.classList.add("todo_title")
    // // todoDesc.classList.add("todo_desc");

    // todoList.appendChild(newTodo);

    // deleteButton = document.createElement('button');
    // deleteButton.innerText = "PRESS ME";
    // newTodo.appendChild(deleteButton);
}

const handleDelete = async(event) => {
    if (event.target.tagName == "BUTTON") {
        try {
        itemTitle = event.target.closest(".new_todo").children[0].innerText;
        key = "title"

        const toDoToDelete = todos.find(item => item.title === itemTitle);

        const newTodos = todos.filter(item => item[key] !== itemTitle);
        todos = newTodos

        await fetch(`https://6709508caf1a3998baa11eb3.mockapi.io/api/v1/todos/${toDoToDelete.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }   
        })
        event.target.closest(".new_todo").remove();
        } catch(err) {
            console.log(err);
        }
    } 
}

const handleSortNormal = (event) => {
    
    function compare(a,b) {
        if ( a.title < b.title ){
            return -1;
          }
          if ( a.title > b.title ){
            return 1;
          }
          return 0;
    }

    todos.sort(compare);

    todoList.innerHTML = '';
    renderTodos();
}

const handleSortReverse = (event) => {
    
    function compare(a,b) {
        if ( a.title < b.title ){
            return 1;
        }
        if ( a.title > b.title ){
            return -1;
        }
        return 0;
    }

    todos.sort(compare);

    todoList.innerHTML = '';
    renderTodos();
}

button.addEventListener("click", handleClick);

todoList.addEventListener("click", handleDelete);

fetchData().then(() => renderTodos());

sortButtonNormal.addEventListener("click", handleSortNormal);

sortButtonReverse.addEventListener("click", handleSortReverse);

// fetchData();
// data.then((res) => res.json()).then((data) => {
//     console.log(data);
// }).catch((err) => console.log(err)).finally( () => {});