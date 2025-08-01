import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartPage from "./screens/StartPage";
import HomePage from "./screens/HomePage";
import ForecastPage from "./screens/ForecastScreen";
import { Provider } from "react-redux";
import store from "./redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
