const fetchData = async() => {
    try {
        const data = await fetch("https://6709508caf1a3998baa11eb3.mockapi.io/api/v1/todos");
        const todos = await data.json();
        return todos;
    } catch (err) {
        console.log(err);
        return [];
    }
}

const postData = async(newTodo) => {
    try {
        const data = await fetch("https://6709508caf1a3998baa11eb3.mockapi.io/api/v1/todos", {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {
                'Content-Type': 'application/json'
            }   
        });
        return await data.json();
    } catch(err) {
        console.log(err);
        return null;
    }
}

const deleteData = async(itemId) => {
    try {
        await fetch(`https://6709508caf1a3998baa11eb3.mockapi.io/api/v1/todos/${itemId} `, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }   
        })
    } catch(err) {
        console.log(err);
    }
}


export  { fetchData, postData, deleteData };