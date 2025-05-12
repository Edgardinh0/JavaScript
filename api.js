let todos = []; 

const fetchData = async() => {
    try {
        const data = await fetch("https://6709508caf1a3998baa11eb3.mockapi.io/api/v1/todos");
        todos = await data.json();
    } catch (err) {
        console.log(err);
    }
}

export  { fetchData, todos };