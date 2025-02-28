import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartPage from "./screens/StartPage";
import { LinearGradient } from "expo-linear-gradient";
import HomePage from "./screens/HomePage";
import ForecastPage from "./screens/ForecastScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Start" component={StartPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Forecast" component={ForecastPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
