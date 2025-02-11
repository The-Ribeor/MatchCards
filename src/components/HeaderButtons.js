import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Audio } from "expo-av";
import { useFocusEffect } from "@react-navigation/native";
import { SoundContext } from "../context/SoundContext";

export const HeaderButtons = () => {
  const { isMusicOn, toggleMusic } = useContext(SoundContext); // Usar el contexto para el botón de música
  const [isSoundOn, setIsSoundOn] = useState(true); // Estado local para el botón de volumen
  const [sound, setSound] = useState(null); // Objeto de sonido para el soundtrack

  // Cargar el soundtrack solo cuando la vista está activa
  useFocusEffect(
    React.useCallback(() => {
      let music;

      const loadMusic = async () => {
        music = new Audio.Sound();
        await music.loadAsync(require("../../assets/traks/pista.mp3"), {
          isLooping: true,
          volume: isSoundOn ? 1.0 : 0.0, // Controla el volumen al cargar
        });
        setSound(music);
        if (isSoundOn) await music.playAsync(); // Reproduce el soundtrack si el sonido está activado
      };

      loadMusic();

      return () => {
        if (music) {
          music.unloadAsync(); // Limpia el sonido al desmontar
        }
      };
    }, [isSoundOn]) // Se recarga cuando cambia isSoundOn
  );

  // ✅ Alternar el soundtrack (volumen)
  const toggleSound = async () => {
    if (sound) {
      await sound.setVolumeAsync(isSoundOn ? 0.0 : 1.0); // Cambia el volumen
      setIsSoundOn(!isSoundOn); // Cambia el estado de isSoundOn
    }
  };

  return (
    <View style={styles.headerRight}>
      {/* Botón de música (cambia el ícono y controla el sonido de las tarjetas) */}
      <TouchableOpacity onPress={toggleMusic} style={styles.button}>
        <MaterialCommunityIcons
          name={isMusicOn ? "music" : "music-off"}
          size={24}
          color="white"
        />
      </TouchableOpacity>

      {/* Botón de volumen (controla el soundtrack) */}
      <TouchableOpacity onPress={toggleSound} style={styles.button}>
        <Ionicons
          name={isSoundOn ? "volume-medium" : "volume-off"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

// Estilos (igual que antes)
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
    marginLeft: 10,
  },
});
