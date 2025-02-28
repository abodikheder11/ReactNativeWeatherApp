export const API_KEY = "a288ee86ccdb41b888c82033252702";
const currentHour = new Date().getHours();
export async function fetchWeather({ lat, lon }) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=yes&alerts=no`
    );
    const data = await response.json();
    console.log("Weather API Response:", data);

    return {
      currentTemp: {
        temp: data.current.temp_c,
        airQuality: data.current.air_quality["us-epa-index"],
      },
      location: data.location.region,
      date: data.location.localtime.split(" ")[0],
      uvIndex: data.current.uv,
      humidity: data.current.humidity,
      status: data.current.condition.text,
      sunrise: data.forecast.forecastday[0].astro.sunrise,
      sunset: data.forecast.forecastday[0].astro.sunset,
      hourlyForecast: data.forecast.forecastday[0].hour
        .slice(currentHour, currentHour + 4)
        .map((entry) => ({
          temp: entry.temp_c,
          time: entry.time.split(" ")[1],
          icon: entry.condition.icon,
        })),
      dailyForecast: data.forecast.forecastday.map((entery) => ({
        temp: entery.day.avgtemp_c,
        icon: entery.day.condition.icon,
        day: new Date(entery.date).toLocaleDateString("en-US", {
          weekday: "short",
        }),
      })),
    };
  } catch (error) {
    console.error("Error Fetching weather data:", error);
    return null;
  }
}
