import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LobbyScreen } from "../screens/LobbyScreen";
import { GameScreen } from "../screens/GameScreen";
import { useNavigation } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import { HeaderButtons } from "../components/HeaderButtons";

export const AppStack = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="Lobby">
      <Stack.Screen
        name="Lobby"
        component={LobbyScreen}
        options={{ headerShown: false }} // Oculta el header solo en esta pantalla
      />
      <Stack.Screen
        name="Game"
        component={GameScreen}
        options={{
          title: "", // Título de la pantalla
          headerStyle: { backgroundColor: "black" }, // Fondo del encabezado en negro
          headerTintColor: "white", // Color del texto en blanco para contrastar
          headerLeft: () => <BackButton />,
          headerRight: () => <HeaderButtons />,
        }}
      />
    </Stack.Navigator>
  );
};
