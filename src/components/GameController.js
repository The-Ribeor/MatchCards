import React, { useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

const { height } = Dimensions.get("window");

export const GameController = ({
  onStartGame,
  onResetGame,
  isGameActive,
  isGameCompleted,
}) => {
  
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isGameCompleted) {
      // Cuando isGameCompleted cambia a true, iniciamos la animación
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 300, // Duración de la animación en milisegundos
        useNativeDriver: true, // Mejor rendimiento
      }).start();
    } else {
      // Reseteamos la animación cuando el juego no está completado
      fadeAnimation.setValue(0);
    }
  }, [isGameCompleted]);

  return (
    <View style={styles.container}>
      {!isGameCompleted && (
        <TouchableOpacity
          style={styles.button}
          onPress={isGameActive ? onResetGame : onStartGame}
        >
          <Text style={styles.buttonText}>
            {isGameActive ? "Restart Game" : "Start Game"}
          </Text>
        </TouchableOpacity>
      )}

      {isGameCompleted && (
        <Animated.View
          style={[
            styles.completedCard,
            {
              opacity: fadeAnimation,
              transform: [
                {
                  translateY: fadeAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0], // Se moverá 100 unidades hacia arriba durante la animación
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.fireEmoji}>🔥</Text>
          <Text style={styles.completedTitle}>You are{"\n"}on fire!</Text>
          <TouchableOpacity style={styles.restartButton} onPress={onResetGame}>
            <Text style={styles.restartButtonText}>Save and restart game</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "#F7DF63",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: "90%",
    marginBottom: 20,
  },
  buttonText: {
    color: "#170801",
    fontSize: 21,
    fontFamily: "RevSemiBold",
    textAlign: "center",
  },
  completedContainer: {
    position: "absolute",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    height: 200,
    bottom: 100,
  },
  completedText: {
    backgroundColor: "pink",
    padding: 5,
    borderRadius: 3,
  },

  completedCard: {
    backgroundColor: "#F7DF63",
    width: "100%",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    bottom: 100,
    position: "absolute",
    elevation: 5,
  },
  fireEmoji: {
    fontSize: 40,
    marginBottom: 20,
  },
  completedTitle: {
    color: "#170801",
    fontSize: 45,
    fontFamily: "RevSemiBold",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 40,
  },
  restartButton: {
    borderWidth: 2,
    borderColor: "#170801",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "100%",
  },
  restartButtonText: {
    color: "#170801",
    fontSize: 20,
    fontFamily: "RevSemiBold",
    textAlign: "center",
  },
});
