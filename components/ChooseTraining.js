import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  BackHandler,
  FlatList,
  TouchableHighlight,
  View,
  Image,
} from "react-native";
import Screen from "../components/Screen";

function ChooseTraining({ data, training }) {
  //const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    const backAction = () => {
      props.history.push("/HomeScreen"); //wracamy do glownej
      return true; //musimy zreturnowac true -> patrz dokumentacja
    };

    const backHandler = BackHandler.addEventListener(
      //obsluga hardwarowego back buttona (tylko android)
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // przy odmontowywaniu
  }, []);

  return (
    <Screen>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <View style={styles.addEx}>
          <Image
            style={styles.categoryImg}
            source={require("../assets/dumbbell.png")}
          />
          <Text>{data.exercises[training].category}</Text>
        </View>
        <Text style={{ fontSize: 18 }}>
          {data.exercises[training].exercise_name}
        </Text>
      </View>
    </Screen>
  );
}

export default ChooseTraining;

const styles = StyleSheet.create({
  heading: {
    fontSize: 36,
  },
  addEx: {
    width: 50,
    height: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "5%",
    borderRadius: 200,
    backgroundColor: "#f2f2f2",
  },
  categoryImg: {
    width: 24,
    height: 24,
  },
});
