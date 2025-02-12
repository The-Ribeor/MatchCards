// import React, { useRef, useEffect, useContext } from "react";
// import { TouchableOpacity, Animated, StyleSheet, Text } from "react-native";
// import { Audio } from "expo-av";
// import { SoundContext } from "../context/SoundContext";

// export const Card = ({ card, onPress }) => {
//   const flipAnimation = useRef(new Animated.Value(0)).current;
//   const soundObject = useRef(new Audio.Sound());
//   const { isMusicOn } = useContext(SoundContext); // Usar el contexto

//   useEffect(() => {
//     // Cargar el sonido cuando el componente se monta
//     const loadSound = async () => {
//       await soundObject.current.loadAsync(
//         require("../../assets/traks/flip.mp3")
//       );
//     };
//     loadSound();

//     // Limpiar el sonido cuando el componente se desmonta
//     return () => {
//       soundObject.current.unloadAsync();
//     };
//   }, []);

//   useEffect(() => {
//     Animated.timing(flipAnimation, {
//       toValue: card.flipped ? 1 : 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   }, [card.flipped]);

//   const interpolateRotation = flipAnimation.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0deg", "180deg"],
//   });

//   const handlePress = async () => {
//     onPress(); // Llama a la función onPress original

//     // Reproducir el sonido solo si isMusicOn es true
//     if (isMusicOn) {
//       try {
//         await soundObject.current.replayAsync();
//       } catch (error) {
//         console.error("Error al reproducir el sonido:", error);
//       }
//     }
//   };

//   return (
//     <TouchableOpacity
//       onPress={handlePress}
//       style={styles.card}
//       disabled={card.matched}
//     >
//       <Animated.View
//         style={[
//           styles.innerCard,
//           {
//             transform: [{ rotateY: interpolateRotation }],
//             backgroundColor:
//               card.flipped || card.matched ? "#F7DF63" : "#CDB7E9",
//           },
//         ]}
//       >
//         <Text style={styles.text}>
//           {card.flipped || card.matched ? card.emoji : "❓"}
//         </Text>
//       </Animated.View>
//     </TouchableOpacity>
//   );
// };

// // Estilos (igual que antes)
// const styles = StyleSheet.create({
//   card: {
//     width: 80,
//     height: 80,
//     margin: 5,
//   },
//   innerCard: {
//     width: "100%",
//     height: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 10,
//   },
//   text: {
//     fontSize: 50,
//   },
// });


import React, { useRef, useEffect, useContext } from "react";
import { TouchableOpacity, Animated, StyleSheet, Text } from "react-native";
import { Audio } from "expo-av";
import { SoundContext } from "../context/SoundContext";

export const Card = ({ card, onPress }) => {
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const soundObject = useRef(new Audio.Sound());
  const { isMusicOn } = useContext(SoundContext); // Usar el contexto

  useEffect(() => {
    // Cargar el sonido cuando el componente se monta
    const loadSound = async () => {
      await soundObject.current.loadAsync(
        require("../../assets/traks/flip.mp3")
      );
    };
    loadSound();

    // Limpiar el sonido cuando el componente se desmonta
    return () => {
      soundObject.current.unloadAsync();
    };
  }, []);

  useEffect(() => {
    Animated.timing(flipAnimation, {
      toValue: card.flipped ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [card.flipped]);

  const interpolateRotation = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const handlePress = async () => {
    onPress(); // Llama a la función onPress original

    // Reproducir el sonido solo si isMusicOn es true
    if (isMusicOn) {
      try {
        await soundObject.current.replayAsync();
      } catch (error) {
        console.error("Error al reproducir el sonido:", error);
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.card}
      disabled={card.matched}
    >
      <Animated.View
        style={[
          styles.innerCard,
          {
            transform: [{ rotateY: interpolateRotation }],
            backgroundColor:
              card.flipped || card.matched ? "#F7DF63" : "#CDB7E9",
          },
        ]}
      >
        <Text style={styles.text}>
          {card.flipped || card.matched ? card.emoji : "❓"}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 80,
    height: 80,
    margin: 5,
  },
  innerCard: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 50,
  },
});