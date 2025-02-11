import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";

export const Footer = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2, // Aumenta el tamaño (latido)
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Vuelve al tamaño normal
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start(() => pulse()); // Repite el efecto
    };

    pulse();
  }, [scaleAnim]);

  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Designed by </Text>
      <TouchableOpacity>
        <Text style={styles.footerBottonText}>The Ribeor</Text>
      </TouchableOpacity>
      <Animated.Text style={[styles.heart, { transform: [{ scale: scaleAnim }] }]}>
        ❤️
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  footerText: {
    color: "#FFF",
    fontFamily: "RevRegular",
    fontSize: 16,
  },
  footerBottonText: {
    fontFamily: "RevSemiBold",
    color: "#FFF",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    fontSize: 16,
  },
  heart: {
    marginLeft:5
  }
});
