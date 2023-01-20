import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CharacterScreen from "../Screens/CharacterScreen";
import EditCharacterScreen from "../Screens/EditCharacterScreen";

const Stack = createStackNavigator();

export default function CharacterStack() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Character" component={CharacterScreen} />
            <Stack.Screen name="EditCharacter" component={EditCharacterScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}