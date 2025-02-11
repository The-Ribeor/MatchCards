
import React, { useRef, useEffect } from "react";
import { TouchableOpacity, Animated, StyleSheet, Text } from "react-native";

export const Card = ({ card, onPress }) => {
  const flipAnimation = useRef(new Animated.Value(0)).current;

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

  return (
    <TouchableOpacity onPress={onPress} style={styles.card} disabled={card.matched}>
      <Animated.View
        style={[
          styles.innerCard,
          {
            transform: [{ rotateY: interpolateRotation }],
            backgroundColor: card.flipped || card.matched ? "#F7DF63" : "#CDB7E9", 
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


// import React, { useRef, useEffect } from "react";
// import { TouchableOpacity, Animated, StyleSheet, Text } from "react-native";

// export const Card = ({ card, onPress, gameStarted }) => {
//   const flipAnimation = useRef(new Animated.Value(0)).current;

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

//   return (
//     <TouchableOpacity
//       onPress={gameStarted ? onPress : null} // No permite tocar si el juego no ha iniciado
//       style={styles.card}
//       disabled={!gameStarted || card.matched} // Bloquea si el juego no ha comenzado o si ya está emparejada
//     >
//       <Animated.View
//         style={[
//           styles.innerCard,
//           {
//             transform: [{ rotateY: interpolateRotation }],
//             backgroundColor: card.flipped || card.matched ? "#F7DF63" : "#6A0DAD", // Amarillo si está volteada, morado si no
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
//     fontSize: 24,
//   },
// });
