import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
} from "react-native";

function ChooseCategory({ name, onPress, icon }) {
  return (
    <TouchableHighlight onPress={onPress} style={styles.category}>
      <View style={styles.container}>
        <Image source={icon} style={styles.categoryImg} />
        <Text>{name}</Text>
      </View>
    </TouchableHighlight>
  );
}

export default ChooseCategory;

const styles = StyleSheet.create({
  category: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    width: 100,
    height: 100,
    paddingHorizontal: 30,
    paddingVertical: 25,
    backgroundColor: "#f2f2f2",
    color: "#000",
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 500,
  },
  container: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  categoryImg: {
    width: 32,
    height: 32,
    marginBottom: 4,
  },
});
