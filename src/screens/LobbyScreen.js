

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   Animated,
//   StatusBar,
//   SafeAreaView,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Footer } from "../components/Footer";

// // Obtener dimensiones de pantalla como constantes
// const { width, height } = Dimensions.get("window");

// export const LobbyScreen = () => {
//   // Hooks deben estar al inicio del componente
//   const navigation = useNavigation();

//   // Usamos useState para almacenar los valores de animación
//   const [animations] = useState({
//     leftAnimation: new Animated.Value(0),
//     rightAnimation: new Animated.Value(0),
//   });

//   // Cálculos responsivos movidos a un estado para asegurar consistencia
//   const [responsiveStyles] = useState(() => {
//     const titleFontSize = Math.min(width, height) * 0.1; // Ajustado para mejor visualización
//     const buttonWidth = width * 0.8;

//     return {
//       titleFontSize,
//       buttonWidth,
//     };
//   });

//   // Creamos las dos palabras del título y las dividimos en letras
//   const leftWord = "MATCH";
//   const rightWord = "CARDS";
//   const leftLetters = leftWord.split("");
//   const rightLetters = rightWord.split("");

//   // useEffect debe estar con el resto de hooks
//   useEffect(() => {
//     // Secuencia de animación
//     Animated.sequence([
//       // Primero anima la columna izquierda
//       Animated.timing(animations.leftAnimation, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//       // Luego anima la columna derecha
//       Animated.timing(animations.rightAnimation, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []); // Sin dependencias, solo se ejecuta al montar

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#000" />

//       <View style={styles.container}>
//         {/* Contenedor para las dos columnas de letras */}
//         <View style={styles.logoContainer}>
//           {/* Columna izquierda: Letras de "MATCH" */}
//           <Animated.View
//             style={{
//               opacity: animations.leftAnimation,
//               transform: [
//                 {
//                   translateY: animations.leftAnimation.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [-100, 0], // Animación de entrada desde arriba
//                   }),
//                 },
//               ],
//             }}
//           >
//             {leftLetters.map((letter, index) => (
//               <Text
//                 key={index}
//                 style={[
//                   styles.titleText,
//                   { fontSize: responsiveStyles.titleFontSize },
//                 ]}
//               >
//                 {letter}
//               </Text>
//             ))}
//           </Animated.View>

//           {/* Columna derecha: Letras de "CARDS" */}
//           <Animated.View
//             style={{
//               opacity: animations.rightAnimation,
//               transform: [
//                 {
//                   translateY: animations.rightAnimation.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [100, 0], // Animación de entrada desde abajo
//                   }),
//                 },
//               ],
//             }}
//           >
//             {rightLetters.map((letter, index) => (
//               <Text
//                 key={index}
//                 style={[
//                   styles.titleText,
//                   { fontSize: responsiveStyles.titleFontSize },
//                 ]}
//               >
//                 {letter}
//               </Text>
//             ))}
//           </Animated.View>
//         </View>

//         {/* Área de botones */}
//         <View style={styles.buttonArea}>
//           <TouchableOpacity
//             style={[styles.button, { width: responsiveStyles.buttonWidth }]}
//             onPress={() => navigation.navigate("Game")}
//             activeOpacity={0.7}
//           >
//             <Text style={styles.buttonText}>New Game</Text>
//           </TouchableOpacity>
//         </View>

//         <Footer />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#000",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//     justifyContent: "space-between",
//     padding: 20,
//   },
//   logoContainer: {
//     flex: 1,
//     flexDirection: "row", // Dos columnas
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 40, // Espacio entre las columnas
//   },
//   titleText: {
//     color: "#C5B3F9",
//     fontFamily: "RevRegular",
//     textTransform: "uppercase",
//     textAlign: "center",
//   },
//   buttonArea: {
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 40,
//   },
//   button: {
//     backgroundColor: "#F7DF63",
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 15,
//     shadowColor: "#F7DF63",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   buttonText: {
//     color: "#170801",
//     fontSize: 22,
//     fontFamily: "RevSemiBold",
//     textAlign: "center",
//   },
// });

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Footer } from "../components/Footer";

// Obtener dimensiones de pantalla como constantes
const { width, height } = Dimensions.get("window");

export const LobbyScreen = () => {
  // Hooks deben estar al inicio del componente
  const navigation = useNavigation();

  // Usamos useState para almacenar los valores de animación
  const [animations] = useState({
    leftAnimation: new Animated.Value(0),
    rightAnimation: new Animated.Value(0),
  });

  // Cálculos responsivos movidos a un estado para asegurar consistencia
  const [responsiveStyles] = useState(() => {
    const titleFontSize = Math.min(width, height) * 0.26; 
    
    const buttonWidth = width * 0.8;

    return {
      titleFontSize,
      buttonWidth,
    };
  });

  // Creamos las dos palabras del título y las dividimos en letras
  const leftWord = "MATCH";
  const rightWord = "CARDS";
  const leftLetters = leftWord.split("");
  const rightLetters = rightWord.split("");

  // useEffect debe estar con el resto de hooks
  useEffect(() => {
    // Secuencia de animación
    Animated.sequence([
      // Primero anima la columna izquierda
      Animated.timing(animations.leftAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Luego anima la columna derecha
      Animated.timing(animations.rightAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []); // Sin dependencias, solo se ejecuta al montar

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={styles.container}>
        {/* Contenedor para las dos columnas de letras */}
        <View style={styles.logoContainer}>
          {/* Columna izquierda: Letras de "MATCH" */}
          <Animated.View
            style={{
              opacity: animations.leftAnimation,
              transform: [
                {
                  translateY: animations.leftAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 0], // Animación de entrada desde arriba
                  }),
                },
              ],
            }}
          >
            {leftLetters.map((letter, index) => (
              <Text
                key={index}
                style={[
                  styles.titleText,
                  { fontSize: responsiveStyles.titleFontSize },
                ]}
              >
                {letter}
              </Text>
            ))}
          </Animated.View>

          {/* Columna derecha: Letras de "CARDS" */}
          <Animated.View
            style={{
              opacity: animations.rightAnimation,
              transform: [
                {
                  translateY: animations.rightAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0], // Animación de entrada desde abajo
                  }),
                },
              ],
            }}
          >
            {rightLetters.map((letter, index) => (
              <Text
                key={index}
                style={[
                  styles.titleText,
                  { fontSize: responsiveStyles.titleFontSize },
                ]}
              >
                {letter}
              </Text>
            ))}
          </Animated.View>
        </View>

        {/* Área de botones */}
        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={[styles.button, { width: responsiveStyles.buttonWidth }]}
            onPress={() => navigation.navigate("Game")}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>New Game</Text>
          </TouchableOpacity>
        </View>

        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "space-between",
    padding: 20,
  },
  logoContainer: {
    flex: 1,
    flexDirection: "row", // Dos columnas
    alignItems: "center",
    justifyContent: "center",
    gap: 40, // Espacio entre las columnas
  },
  titleText: {
    color: "#C5B3F9",
    fontFamily: "RevRegular",
    textTransform: "uppercase",
    textAlign: "center",
  },
  buttonArea: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#F7DF63",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    shadowColor: "#F7DF63",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#170801",
    fontSize: 22,
    fontFamily: "RevSemiBold",
    textAlign: "center",
  },
});