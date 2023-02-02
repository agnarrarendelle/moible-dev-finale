import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

import Header from "./components/Header";
import List from "./components/List";
import Footer from "./components/Footer";

import { SortOptions } from "./constant";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home";
import ListDetail from "./components/ListDetail";

const Stack = createNativeStackNavigator<StackParamList>()

const App = () => {

return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="ListDetail" component={ListDetail}></Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
)

};


export default App;
