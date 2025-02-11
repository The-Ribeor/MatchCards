import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { StyleSheet } from "react-native";
import { Root } from "./src/Root";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AppStack } from "./src/navigations/AppStack";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Cargar las fuentes
  const [loaded, error] = useFonts({
    RevRegular: require("./assets/fonts/RevxNeueDemo-Regular.ttf"),
    RevSemiBold: require("./assets/fonts/RevxNeueDemo-SemiBold.ttf"),
  });

  // Efecto para manejar la carga de fuentes
  useEffect(() => {
    const prepare = async () => {
      try {
        // Mantén el SplashScreen visible mientras se cargan las fuentes
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        // Cuando las fuentes estén cargadas, oculta el SplashScreen
        if (loaded || error) {
          setFontsLoaded(true);
          await SplashScreen.hideAsync();
        }
      }
    };

    prepare();
  }, [loaded, error]);

  // Si las fuentes no están cargadas, retorna null
  if (!fontsLoaded) {
    return null;
  }

  // Si las fuentes están cargadas, renderiza la aplicación
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    color: "red",
    backgroundColor: "#000", // Asegúrate de que el fondo sea coherente con tu diseño
  },
});

// <SafeAreaProvider>
//   <SafeAreaView style={styles.safeArea}>
//     <Root />

//   </SafeAreaView>
// </SafeAreaProvider>
