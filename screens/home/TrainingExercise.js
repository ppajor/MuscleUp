import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  TouchableHighlight,
  FlatList,
} from "react-native";
import Timer from "../../components/Timer";

function TrainingExercise(props) {
  const [isDone, setIsDone] = useState(false);

  const handleDoneExercise = () => {
    setIsDone((state) => !state);
  };

  return (
    <View style={[styles.container, isDone && styles.doneBg]}>
      <Timer />
      <Text>{props.exercise.exercise_name}</Text>
      <FlatList
        data={Object.values(props.exercise.series)}
        keyExtractor={(el) => el.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.series_repeat} powtórzeń</Text>
            <Text>{item.series_kg}kg</Text>
          </View>
        )}
      />
      <TouchableHighlight
        style={[styles.btn, { marginBottom: 100 }]}
        onPress={() => handleDoneExercise()}
      >
        {isDone ? (
          <Text style={styles.btnText}>Anuluj</Text>
        ) : (
          <Text style={styles.btnText}>Zrobione</Text>
        )}
      </TouchableHighlight>
    </View>
  );
}

export default TrainingExercise;

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    display: "flex",
    alignItems: "center",
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    marginTop: "70%",
    borderRadius: 200,
    backgroundColor: "dodgerblue",
  },
  btnText: {
    color: "#fff",
  },
  doneBg: {
    backgroundColor: "#999",
  },
});
