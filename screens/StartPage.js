import { View, Text, StyleSheet, Image, Button, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function StartPage({ navigation }) {
  function navigationHandler() {
    navigation.navigate("Home");
  }

  return (
    <LinearGradient
      colors={["#3E1C74", "#A644C4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Image style={styles.image} source={require("../assets/rainy.png")} />
      <Text style={styles.weather}>Weather</Text>
      <Text style={styles.forcast}>ForeCasts</Text>
      <Pressable style={styles.button} onPress={navigationHandler}>
        <Text style={styles.textButton}>Get Start</Text>
      </Pressable>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  weather: {
    fontSize: 64,
    color: "white",
    fontWeight: "bold",
  },
  forcast: {
    fontSize: 64,
    color: "#DDB130",
    fontWeight: "bold",
    marginTop: -20,
  },
  button: {
    marginTop: 20,
    textAlign: "center",
    backgroundColor: "#DDB130",
    minWidth: "60%",
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    borderRadius: 30,
  },
  textButton: {
    fontSize: 24,
    color: "#3E1C74",
    fontWeight: "bold",
  },
});
