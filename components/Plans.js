import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  FlatList,
} from "react-native";
import ChooseTraining from "./ChooseTraining";

const categories = [
  {
    nogi: {
      icon: require("../assets/leg.png"),
    },
    plecy: {
      icon: require("../assets/back.png"),
    },
    klata: {
      icon: require("../assets/chest.png"),
    },
    barki: {
      icon: require("../assets/shoulder.png"),
    },
    tricek: {
      icon: require("../assets/triceps.png"),
    },
    bicek: {
      icon: require("../assets/biceps2.png"),
    },
    brzuch: {
      icon: require("../assets/leg.png"),
    },
  },
];

function Exercise({ data, id, onPress }) {
  //const [highlight, setHighlight] = useState(false);

  return (
    <TouchableHighlight onPress={onPress}>
      <>
        <Text style={styles.heading}>{data.training_name}</Text>
        <FlatList
          data={Object.keys(data.exercises)}
          keyExtractor={(ex) => ex}
          renderItem={({ item }) => (
            <ChooseTraining training={item} data={data} />
          )}
        />
      </>
    </TouchableHighlight>
  );
}

export default Exercise;

const styles = StyleSheet.create({
  container: {
    // padding: "5%",
  },
  heading: {
    fontSize: 36,
  },
  addEx: {
    width: 75,
    height: 75,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 75,
    backgroundColor: "#f2f2f2",
  },
  categoryImg: {
    width: 32,
    height: 32,
  },
});
