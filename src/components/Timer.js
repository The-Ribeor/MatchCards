// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const Timer = ({ gameStarted, setBestTime, bestTime }) => {
//   const [time, setTime] = useState(0);

//   useEffect(() => {
//     let interval;
//     if (gameStarted) {
//       setTime(0);
//       interval = setInterval(() => {
//         setTime((prevTime) => prevTime + 1);
//       }, 1000);
//     } else {
//       clearInterval(interval);
//       if (time > 0) {
//         saveBestTime(time);
//       }
//     }
//     return () => clearInterval(interval);
//   }, [gameStarted]);

//   useEffect(() => {
//     const loadBestTime = async () => {
//       const storedBestTime = await AsyncStorage.getItem("bestTime");
//       if (storedBestTime) {
//         setBestTime(parseInt(storedBestTime, 10));
//       }
//     };
//     loadBestTime();
//   }, []);

//   const saveBestTime = async (newTime) => {
//     if (bestTime === null || newTime < bestTime) {
//       setBestTime(newTime);
//       await AsyncStorage.setItem("bestTime", newTime.toString());
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {bestTime !== null && (
//         <Text style={styles.bestTimeText}>Mejor tiempo: {bestTime}s</Text>
//       )}
//       <Text style={styles.timerText}>{time}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: 10,
//     width:'100%'
//   },
//   timerText: {
//     fontSize: 40,
//     color: "#FFF",
//     fontWeight: "RuvRegular",

//   },
//   bestTimeText: {
//     fontSize: 18,
//     color: "#FFD700",
//     marginTop: 5,
//   },
// });


import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Timer = ({ gameStarted, setBestTime, bestTime }) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

//   useEffect(() => {
//     let interval;
//     if (gameStarted) {
//       setTime(0);
//       setRunning(true);
//       interval = setInterval(() => {
//         setTime((prevTime) => prevTime + 10); // Incremento en milisegundos
//       }, 10);
//     } else {
//       clearInterval(interval);
//       setRunning(false);
//       if (time > 0) {
//         saveBestTime(time);
//       }
//     }
//     return () => clearInterval(interval);
//   }, [gameStarted]);


useEffect(() => {
    let interval;
    if (gameStarted) {
      setTime(0);
      setRunning(true);
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
      setRunning(false);
      if (time > 0) {
        saveBestTime(time);
      }
    }
    return () => clearInterval(interval);
  }, [gameStarted]);
  useEffect(() => {
    const loadBestTime = async () => {
      const storedBestTime = await AsyncStorage.getItem("bestTime");
      if (storedBestTime) {
        setBestTime(parseInt(storedBestTime, 10));
      }
    };
    loadBestTime();
  }, []);

  const saveBestTime = async (newTime) => {
    if (bestTime === null || newTime < bestTime) {
      setBestTime(newTime);
      await AsyncStorage.setItem("bestTime", newTime.toString());
    }
  };

  // Función para formatear el tiempo en mm:ss:SS
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      {bestTime !== null && (
        <Text style={styles.bestTimeText}>{formatTime(bestTime)}</Text>
      )}
      <Text style={styles.timerText}>{running ? formatTime(time) : "00:00.00"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 10,
    width: "100%",
  },
  timerText: {
    fontSize: 40,
    color: "#FFF",
    fontFamily: "RevRegular",
  },
  bestTimeText: {
    fontSize: 30,
    fontFamily: "RevSemiBold",
    color: "#F0E42B",
    marginTop: 5,
  },
});
