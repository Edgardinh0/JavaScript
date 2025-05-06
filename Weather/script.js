const inputField = document.querySelector(".input_field");
const submitButton = document.querySelector(".submit_button");
const cityNameField = document.querySelector(".city_name");
const temperatureField = document.querySelector(".temperature");
const weatherTypeField = document.querySelector(".weather_type");
const image = document.querySelector(".image");

let weather = [];

const fetchData = async(city_name) => {
    try {
        const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=5b710512f7764e5b9e0153937250605&q=${city_name}`)
        weather = await data.json();
    } catch (err) {
        console.log(err);
    }
}

handleSubmit = (event) => {
    city_name = inputField.value;
    fetchData(city_name).then(() => putInfo(city_name, weather.current["temp_c"], weather.current.condition['text']))
}

const putInfo = (city, temperature, weather_type) => {
    console.log(weather);
    console.log();
    cityNameField.innerText = city;
    temperatureField.innerText = `${temperature}^C`;
    weatherTypeField.innerText = weather_type;
    image.src = weather.current.condition['icon']
}

submitButton.addEventListener("click", handleSubmit);