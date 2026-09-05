import { API_KEY } from "./config.js";

async function getAPI() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=Seoul&limit=1&appid=${API_KEY}`,
    );
    const data = await response.json();
    console.log(data);
    const lat = data[0].lat;
    const lon = data[0].lon;

    const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const weatherData = await weatherResponse.json();
    console.log(weatherData);
  } catch (error) {
    console.error("에러발생", error);
  }
}

getAPI();
