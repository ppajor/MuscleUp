import React from "react";
import { View, Text, StyleSheet } from "react-native";

function LastTrainingRow(props) {
  return (
    <View style={styles.exRow}>
      <View style={{ width: "50%" }}>
        <Text style={{ fontSize: 18, color: "#4D4352" }}>{props.name}</Text>
      </View>
      <View
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={[styles.lastTrainingSmallText, styles.grayText]}>
          {props.date}
        </Text>
        <Text style={[styles.lastTrainingSmallText, styles.grayText]}>
          {props.time}
        </Text>
        <Text style={[styles.lastTrainingSmallText, styles.blackieTextColor]}>
          edytuj
        </Text>
      </View>
    </View>
  );
}

export default LastTrainingRow;

const styles = StyleSheet.create({
  exRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 52,
    padding: 12,
    marginTop: "2%",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#A062C7",
    backgroundColor: "#fff",
  },
  exCategory: {
    width: 52,
    height: 52,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "5%",
    borderRadius: 200,
    backgroundColor: "#f2f2f2",
  },
  lastTrainingSmallText: {
    fontSize: 12,
    color: "black",
  },
  grayText: {
    color: "#B2A7B8",
  },
  blackieTextColor: {
    color: "#4D4352",
  },
});
