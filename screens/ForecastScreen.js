import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../redux/slices/weatherSlice";
export default function ForecastPage() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.weather);
  const loading = status === "loading";

  useEffect(() => {
    async function fetchMyDailyWeather() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location Required",
          "We need to get your location in order to give you the weather Forecast in your location"
        );
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;
      dispatch(fetchWeather({ lat, lon }));
    }
    fetchMyDailyWeather();
  }, []);

  function getAirQualityDescription(aqi) {
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
  const airQualityDesription = getAirQualityDescription(
    data?.currentTemp.airQuality
  );

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
          <Text style={styles.tempBasicInfo}>{data?.location}</Text>
          <View style={styles.rowContainer}>
            <Text style={styles.tempBasicInfo}>
              Max: {Math.round(data?.currentTemp.temp) + 2}°
            </Text>
            <Text style={styles.tempBasicInfo}>
              Min: {Math.round(data?.currentTemp.temp) - 2}°
            </Text>
          </View>
          <View style={styles.outerDailyContainer}>
            <Text style={styles.sevenDays}>7-Days Forecasts</Text>
            {data?.dailyForecast ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={data?.dailyForecast}
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
                {data?.currentTemp.airQuality}-{airQualityDesription}
              </Text>
            </View>
            <View style={styles.outerSmallContainer}>
              <View style={styles.smallContainer}>
                <View style={styles.rowContainer}>
                  <Feather name="sun" size={24} color="white" />
                  <Text style={styles.titles}> SUNRISE</Text>
                </View>
                <Text style={styles.tempInfo}>{data?.sunrise}</Text>
              </View>
              <View style={styles.smallContainer}>
                <View style={styles.rowContainer}>
                  <Feather name="sunset" size={24} color="white" />
                  <Text style={styles.titles}> SUNSET</Text>
                </View>
                <Text style={styles.tempInfo}>{data?.sunset}</Text>
              </View>
            </View>
            <View style={styles.outerSmallContainer}>
              <View style={styles.smallContainer}>
                <View style={styles.rowContainer}>
                  <Feather name="sunset" size={24} color="white" />
                  <Text style={styles.titles}> UV INDEX</Text>
                </View>
                <Text style={styles.tempInfo}>{data?.uvIndex}-Moderate</Text>
              </View>
              <View style={styles.smallContainer}>
                <View style={styles.rowContainer}>
                  <Feather name="sunset" size={24} color="white" />
                  <Text style={styles.titles}> Humidity</Text>
                </View>
                <Text style={styles.tempInfo}>{data?.humidity}-Moderate</Text>
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
