import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../redux/slices/weatherSlice";
export default function HomePage({ navigation }) {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.weather);
  const loading = status === "loading";

  const date = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  useEffect(() => {
    async function loadWeather() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location Required",
          "We need location permission to show your current weather"
        );
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      let lat = location.coords.latitude;
      let lon = location.coords.longitude;
      dispatch(fetchWeather({ lat, lon }));
    }
    loadWeather();
  }, []);

  function navigationHandler() {
    navigation.navigate("Forecast");
  }
  return (
    <LinearGradient
      colors={["#3E1C74", "#A644C4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#fff"
          style={styles.loadingIndicator}
        />
      ) : (
        <>
          <Image
            style={styles.weatherImage}
            source={require("../assets/rainy.png")}
          />
          <Text style={styles.degree}>
            {data?.currentTemp?.temp !== undefined
              ? `${Math.round(data.currentTemp.temp)}°C`
              : "--"}
          </Text>
          <Text style={styles.tempInfo}>
            {data?.status != undefined ? data.status : "--"}
          </Text>
          <View style={styles.rowCont}>
            <Text style={styles.tempInfo}>
              Max: {Math.round(data?.currentTemp?.temp) + 2}°C
            </Text>
            <Text style={styles.tempInfo}>
              Min: {Math.round(data?.currentTemp?.temp) - 2}°C
            </Text>
          </View>

          <Image
            style={styles.tempImage}
            source={require("../assets/House.png")}
          />
          <Pressable onPress={navigationHandler} style={{ width: "100%" }}>
            <LinearGradient
              colors={["#3E1C74", "#A644C4"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.innerContainer}
            >
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>Today</Text>
                <Text style={styles.dateText}>{date}</Text>
              </View>
              <View style={styles.outerHoursContainer}>
                {data?.hourlyForecast.length > 0 ? (
                  <FlatList
                    data={data?.hourlyForecast}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.hoursForecastContainer}>
                        <Text style={styles.hourlyTemp}>
                          {Math.round(item.temp)}°C
                        </Text>
                        {item.icon ? (
                          <Image
                            source={{ uri: "https:" + item.icon }}
                            style={styles.dailyWeatherIcon}
                          />
                        ) : (
                          <Text>There is no icon!</Text>
                        )}
                        <Text style={styles.hours}>{item.time}</Text>
                      </View>
                    )}
                  />
                ) : (
                  <View style={styles.errorFetchingView}>
                    <Text style={styles.errorFetchingText}>
                      No data for now, we are sorry!
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.seeMoreContainer}>
                <Text style={styles.seeMoreText}>See More About Today</Text>
                <Feather name="arrow-right" color="white" size={24} />
              </View>
            </LinearGradient>
          </Pressable>
        </>
      )}
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  loadingIndicator: {
    marginTop: 100,
  },
  weatherImage: {
    width: 220,
    height: 220,
  },
  degree: {
    fontSize: 64,
    fontWeight: "bold",
    color: "white",
  },
  rowCont: {
    flexDirection: "row",
    marginBottom: 30,
  },
  tempInfo: {
    fontSize: 24,
    color: "white",
    marginHorizontal: 10,
  },
  tempImage: {
    width: 336,
    height: 200,
  },
  outerHoursContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "100%",
    borderRadius: 20,
    alignSelf: "center",
    minHeight: 220,
    justifyContent: "flex-start",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  hoursCenterView: {
    alignItems: "center",
  },
  hoursForecastContainer: {
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  hourlyTemp: {
    fontSize: 20,
    color: "white",
  },

  dailyWeatherIcon: {
    height: 60,
    width: 60,
    margin: 5,
  },
  hours: {
    fontSize: 20,
    color: "white",
  },
  seeMoreContainer: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  seeMoreText: {
    color: "white",
    fontSize: 20,
  },
  errorFetchingView: {
    alignItems: "center",
    justifyContent: "center",
  },
  errorFetchingText: {
    color: "white",
    fontSize: 20,
    margin: 40,
  },
});
