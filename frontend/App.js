import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterPage from "./src/pages/RegisterPage";
import UserLogin from "./src/pages/UserLogin";
import HomePage from "./src/pages/HomePage";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Login" component={UserLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
