import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
} from "react-native";

function ChooseCategory({ handleExercise, exercises, keyprop }) {
  //console.log(exercises);
  console.log("RENDER EZERCISE");
  return (
    <View style={styles.container}>
      {exercises.map((ex) => {
        let licznik = 1;
        return (
          <TouchableHighlight
            key={++licznik}
            onPress={() => handleExercise(ex)}
            style={{ marginTop: "10%" }}
          >
            <Text>{ex}</Text>
          </TouchableHighlight>
        );
      })}
    </View>
  );
}

export default ChooseCategory;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "3%",
  },
});
