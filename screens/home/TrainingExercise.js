import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  TouchableHighlight,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import Timer from "../../components/Timer";

function TrainingExercise(props) {
  const [isDone, setIsDone] = useState(false);
  const [setKg, kg] = useState();
  //const [results, setResults] = useEffect({});
  //console.log(results);
  /*
  useEffect(() => {
    let x = { ...results, [props.id]: false };
    setResults(x);
  }, []);
*/
  const handleDoneExercise = () => {
    setIsDone((state) => !state);
  };

  return (
    <View style={[styles.container, isDone && styles.doneBg]}>
      <Timer endTraining={(time) => props.endTraining(time)} />
      <Image source={require("../../assets/dumbbell.png")} />

      <Text style={[styles.h2, { marginBottom: "10%" }]}>
        {props.exercise.exercise_name}
      </Text>
      <FlatList
        data={Object.values(props.exercise.series)}
        keyExtractor={(el) => el.id}
        renderItem={({ item }) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              paddingHorizontal: "25%",
            }}
          >
            <TextInput value={item.repeat} />
            <Text style={styles.h3}> powtórzeń</Text>
            <TextInput value={item.kg} />
            <Text style={styles.h3}>kg</Text>
          </View>
        )}
      />
      <TouchableHighlight
        style={[styles.btn, { marginBottom: 100 }]}
        onPress={() => {
          handleDoneExercise();
          props.isExerciseDone();
        }}
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
  h2: {
    fontSize: 22,
  },
  h3: {
    fontSize: 18,
  },
});
