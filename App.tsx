import React from "react";
import "react-native-get-random-values";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./components/Home";
import ListDetail from "./components/ListDetail";

//Create a stack navigator with type defined in global.d.ts
const Stack = createNativeStackNavigator<StackParamList>();

const App = () => {

  //Whem a task in the list in Home page is clicked, the task detail page will pop up
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="ListDetail"
          component={ListDetail}
          options={({ route }) => ({
            title: route.params.task,
            headerStyle: {
              backgroundColor: "#fff",
            },
          })}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
