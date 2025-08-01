import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const currentHour = new Date().getHours();

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async ({ lat, lon }) => {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=a288ee86ccdb41b888c82033252702&q=${lat},${lon}&days=7&aqi=yes&alerts=no`
    );
    if (!response.ok) {
      throw new Error("Weather API failed: " + response.status);
    }
    const data = await response.json();
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
      dailyForecast: data.forecast.forecastday.map((entry) => ({
        temp: entry.day.avgtemp_c,
        icon: entry.day.condition.icon,
        day: new Date(entry.date).toLocaleDateString("en-US", {
          weekday: "short",
        }),
      })),
    };
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default weatherSlice.reducer;
