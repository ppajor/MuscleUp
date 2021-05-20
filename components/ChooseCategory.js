import React from "react";
import { View, Text, StyleSheet } from "react-native";

function ChooseCategory({ name }) {
  return (
    <View style={styles.category}>
      <Text>{name}</Text>
    </View>
  );
}

export default ChooseCategory;

const styles = StyleSheet.create({
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  category: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    width: 100,
    height: 100,
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: "#B221C9",
    color: "#000",
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 500,
  },
});
