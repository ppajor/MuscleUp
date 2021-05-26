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
        const id = Math.random().toString(36).substr(2, 9); //tworzenie id
        return (
          <TouchableHighlight
            key={id}
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
