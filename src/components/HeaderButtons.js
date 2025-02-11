import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export const HeaderButtons = () => {
  const [isMusicOn, setIsMusicOn] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(true);

  return (
    <View style={styles.headerRight}>
      <TouchableOpacity
        onPress={() => setIsMusicOn(!isMusicOn)}
        style={styles.button}
      >
        <MaterialCommunityIcons
          name={isMusicOn ? "music" : "music-off"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsSoundOn(!isSoundOn)}
        style={styles.button}
      >
        <Ionicons
          name={isSoundOn ? "volume-medium" : "volume-off"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

// ✅ Estilos
const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    marginRight: 15,
  },
  button: {
    borderWidth: 1.5,
    padding: 5,
    borderRadius: 5,
    borderColor: "white",
    marginLeft: 10, // Espaciado entre los botones
  },
});
