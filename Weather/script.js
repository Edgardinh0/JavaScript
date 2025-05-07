const inputField = document.querySelector(".input_field");
const submitButton = document.querySelector(".submit_button");
const cityNameField = document.querySelector(".city_name");
const temperatureField = document.querySelector(".temperature");
const weatherTypeField = document.querySelector(".weather_type");
const image = document.querySelector(".image");
const inputWrapper = document.querySelector(".wrapper");
const informationBox = document.querySelector(".information");
const closeButton = document.querySelector(".close_weather_button");

let weather = [];

const fetchData = async(city_name) => {
    const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=5b710512f7764e5b9e0153937250605&q=${city_name}`)
    if (data.ok) {
        weather = await data.json();
        putInfo(city_name, weather.current["temp_c"], weather.current.condition['text']);
    } 
    else {
        console.log("Ошибка");
    }
}

const handleSubmit = (event) => {
    city_name = inputField.value;
    fetchData(city_name);
}

const putInfo = (city, temperature, weather_type) => {

    informationBox.style.visibility = "visible"
    inputWrapper.style.opacity = 0;
    cityNameField.innerText = city;
    temperatureField.innerText = `${temperature}℃`;
    weatherTypeField.innerText = weather_type;
    image.src = weather.current.condition['icon']
    informationBox.style.opacity = 1;

}

const handleClose = () => {
    inputWrapper.style.opacity = 1;
    informationBox.style.opacity = 0;
    informationBox.style.visibility = "hidden"
}

submitButton.addEventListener("click", handleSubmit);
closeButton.addEventListener("click", handleClose);