import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "../components/Card";
import { Timer } from "../components/Timer";
import { GameController } from "../components/GameController";
import { Footer } from "../components/Footer";

const emojis = ["🤖", "👽", "🤡", "👻", "🎃", "👾", "😈", "🥶"];

const shuffleEmojis = () => {
  return [...emojis, ...emojis].sort(() => Math.random() - 0.5);
};

export const GameScreen = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [bestTime, setBestTime] = useState(null);
  const [isGameCompleted, setIsGameCompleted] = useState(false); // Nuevo estado

  // Función para verificar si todas las cartas están emparejadas
  const checkGameCompletion = (cards) => {
    const allMatched = cards.every((card) => card.matched);
    setIsGameCompleted(allMatched);
  };

  const handleCardPress = (id) => {
    if (!gameStarted || selectedCards.length === 2 || cards[id].flipped) return;

    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);
    setSelectedCards([...selectedCards, id]);
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      if (cards[first].emoji === cards[second].emoji) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === first || card.id === second
              ? { ...card, matched: true }
              : card
          )
        );
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === first || card.id === second
                ? { ...card, flipped: false }
                : card
            )
          );
        }, 1000);
      }
      setSelectedCards([]);
    }
  }, [selectedCards]);

  // Verificar si el juego ha terminado y detener el temporizador
  useEffect(() => {
    if (cards.length > 0) {
      checkGameCompletion(cards); // Verificar si todas las cartas están emparejadas
      if (cards.every((card) => card.matched)) {
        setGameStarted(false); // Detiene el juego
      }
    }
  }, [cards]);

  const resetGame = () => {
    setGameStarted(false);
    setIsGameCompleted(false); // Reiniciar el estado de completado
    setTimeout(() => {
      setGameStarted(true);
      const shuffledEmojis = shuffleEmojis();
      setCards(
        shuffledEmojis.map((emoji, index) => ({
          id: index,
          emoji,
          flipped: false,
          matched: false,
        }))
      );
      setSelectedCards([]);
    }, 300);
  };

  return (
    <View style={styles.container}>
      <Timer
        gameStarted={gameStarted}
        setBestTime={setBestTime}
        bestTime={bestTime}
      />
      <View style={styles.board}>
        {!gameStarted && !isGameCompleted && (
          <View style={styles.messageContainer}>
            <Text style={styles.instructions}>
              Press the button to start playing
            </Text>
          </View>
        )}
        <View style={styles.board}>
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onPress={() => handleCardPress(card.id)}
            />
          ))}
        </View>
      </View>

      <GameController
        isGameActive={gameStarted}
        onStartGame={resetGame}
        onResetGame={resetGame}
        isGameCompleted={isGameCompleted} // Pasar el estado de completado
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    width: "100%",
  },
  messageContainer: {
    position: "absolute",
  },
  instructions: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "RevRegular",
    textAlign: "center",
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
  },
});



