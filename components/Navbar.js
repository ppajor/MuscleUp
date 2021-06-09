import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { withRouter, Redirect } from "react-router-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const Navbar = (props) => {
  return (
    <View style={styles.navbarContainer}>
      <TouchableOpacity
        style={styles.navbarItem}
        onPress={() => props.history.push("/HomeScreen")}
      >
        <SimpleLineIcons name="home" size={24} color="#A062C7" />
        <Text style={styles.navbarItemText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.history.push("/ProfileScreen")}
        style={styles.navbarItem}
      >
        <>
          <SimpleLineIcons name="user" size={24} color="#A062C7" />
          <Text style={styles.navbarItemText}>Profil</Text>
        </>
      </TouchableOpacity>
    </View>
  );
};

export default withRouter(Navbar); //musimy dac withRouter zeby działało props.history.push

const styles = StyleSheet.create({
  navbarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "8%",
    position: "relative",
    bottom: 0,
    backgroundColor: "transparent",
    borderTopWidth: 2,
    borderTopColor: "#A062C7",
    zIndex: 3,
  },
  navbarItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  navbarItemText: {
    color: "#A062C7",
  },
});
