import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { fetchDailyWeather, fetchWeather } from "../util/weatherService";
import * as Location from "expo-location";
export default function ForecastPage() {
  const [dailyWeather, setDailyWeather] = useState([]);
  const [loading, setLoading] = useState();
  const [location, setLocation] = useState();
  const [currentTemp, setCurrentTemp] = useState();
  const [airQuality, setAirQuality] = useState();
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [uvIndex, setUvIndex] = useState();
  const [humidity, setHumidity] = useState();

  useEffect(() => {
    async function fetchMyDailyWeather() {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location Required",
          "We need to get your location in order to give you the weather Forecast in your location"
        );
        setLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;
      const weather = await fetchWeather({ lat, lon });
      if (weather) {
        setDailyWeather(weather.dailyForecast);
        setLocation(weather.location);
        setCurrentTemp(weather.currentTemp.temp);
        setAirQuality(weather.currentTemp.airQuality);
        setSunrise(weather.sunrise);
        setSunset(weather.sunset);
        setUvIndex(weather.uvIndex);
        setHumidity(weather.humidity);
      }
      setLoading(false);
    }
    fetchMyDailyWeather();
  }, []);

  function getAirQualityDesription(aqi) {
    switch (aqi) {
      case 1:
        return "Good : No Health Risk ";
      case 2:
        return "Moderate: Sensitive People Should Limit Exposure ";
      case 3:
        return "Unhealthy for Sensitive Groups: Reduce Outdoor Activity ";
      case 4:
        return "Unhealthy: Everyone Should Limit Outdoor Activity ";
      case 5:
        return "Very Unhealthy: Avoid Outdoor Activities ";
      case 6:
        return "Hazardous: Emergency Conditions, Stay Indoors ";
      default:
        return "Unknown Air Quality";
    }
  }
  const airQualityDesription = getAirQualityDesription(airQuality);

  return (
    <LinearGradient
      colors={["#3E1C74", "#A644C4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {loading ? (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="large"
          color="white"
        />
      ) : (
        <>
          <Text style={styles.tempBasicInfo}>{location}</Text>
          <View style={styles.rowContainer}>
            <Text style={styles.tempBasicInfo}>
              Max: {Math.round(currentTemp) + 2}°
            </Text>
            <Text style={styles.tempBasicInfo}>
              Min: {Math.round(currentTemp) - 2}°
            </Text>
          </View>
          <View style={styles.outerDailyContainer}>
            <Text style={styles.sevenDays}>7-Days Forecasts</Text>
            {dailyWeather ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={dailyWeather}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <LinearGradient
                    colors={["#6A3FA1", "#C77ED6"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.innerDailyContainer}
                  >
                    <Text style={styles.titles}>{Math.round(item.temp)}°C</Text>
                    <Image
                      source={{ uri: "https:" + item.icon }}
                      style={styles.weatherIcon}
                    />
                    <Text style={styles.titles}>{item.day}</Text>
                  </LinearGradient>
                )}
              />
            ) : (
              <Text style={styles.errorDailyContainer}>
                Sorry we can't fetch your weather now!
              </Text>
            )}
          </View>
          <LinearGradient
            colors={["#6A3FA1", "#C77ED6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.airQualityContainer}
          >
            <View style={styles.airContainer}>
              <View style={styles.rowContainer}>
                <Entypo name="air" color="white" size={24} />
                <Text style={styles.titles}> AIR QUALITY</Text>
              </View>
              <Text style={styles.tempInfo}>
                {airQuality}-{airQualityDesription}
              </Text>
            </View>
            <View style={styles.outerSmallContainer}>
              <View style={styles.smallContainer}>
                <View style={styles.rowContainer}>
                  <Feather name="sun" size={24} color="white" />
                  <Text style={styles.titles}> SUNRISE</Text>
                </View>
                <Text style={styles.tempInfo}>{sunrise}</Text>
              </View>
              <View style={styles.smallContainer}>
                <View style={styles.rowContainer}>
                  <Feather name="sunset" size={24} color="white" />
                  <Text style={styles.titles}> SUNSET</Text>
                </View>
                <Text style={styles.tempInfo}>{sunset}</Text>
              </View>
            </View>
            <View style={styles.outerSmallContainer}>
              <View style={styles.smallContainer}>
                <View style={styles.rowContainer}>
                  <Feather name="sunset" size={24} color="white" />
                  <Text style={styles.titles}> UV INDEX</Text>
                </View>
                <Text style={styles.tempInfo}>{uvIndex}-Moderate</Text>
              </View>
              <View style={styles.smallContainer}>
                <View style={styles.rowContainer}>
                  <Feather name="sunset" size={24} color="white" />
                  <Text style={styles.titles}> Humidity</Text>
                </View>
                <Text style={styles.tempInfo}>{humidity}-Moderate</Text>
              </View>
            </View>
          </LinearGradient>
        </>
      )}
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    padding: 20,
  },
  loadingIndicator: {
    marginTop: 100,
  },
  tempBasicInfo: {
    fontSize: 24,
    color: "white",
    marginHorizontal: 10,
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  outerDailyContainer: {
    alignItems: "flex-start",
    maxHeight: 280,
  },
  sevenDays: {
    fontSize: 24,
    fontWeight: "400",
    color: "white",
    marginHorizontal: 10,
    marginTop: 40,
  },
  innerDailyContainer: {
    borderRadius: 50,
    padding: 10,
    margin: 10,
    maxHeight: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  errorDailyContainer: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  titles: {
    fontSize: 20,
    color: "white",
  },
  weatherIcon: {
    height: 60,
    width: 60,
  },
  airQualityContainer: {
    width: "95%",
    borderRadius: 30,
    padding: 10,
  },
  rowContainer: {
    flexDirection: "row",
  },
  tempInfo: {
    marginVertical: 20,
    fontSize: 24,
    color: "white",
  },
  airContainer: {
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 1,
    padding: 15,
    margin: 10,
  },
  outerSmallContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  smallContainer: {
    flex: 1,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 1,
    padding: 15,
    margin: 10,
  },

  sunsetText: {
    color: "grey",
    fontSize: 24,
  },
});
