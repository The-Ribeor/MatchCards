import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export const GameController = ({ onStartGame, onResetGame, isGameActive }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={isGameActive ? onResetGame : onStartGame}
      >
        <Text style={styles.buttonText}>
          {isGameActive ? "Restart Game" : "Start Game"}
        </Text>
      </TouchableOpacity>
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
    width: "100%",
  },
  buttonText: {
    color: "#170801",
    fontSize: 21,
    fontFamily: "RevSemiBold",
    textAlign: "center",
  },
});
