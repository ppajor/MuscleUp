import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image, BackHandler } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import Navbar from "../../components/Navbar";
import Screen from "../../components/Screen";

function ProfileScreen(props) {
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
      <View style={styles.container}>
        <View style={styles.profileBackground}></View>
        <View style={styles.profileInformation}>
          <View style={styles.profileName}>
            <Image
              source={require("../../assets/avatar.png")}
              style={styles.avatar}
            />
            <Text style={styles.nameText}>Paweł Pajor</Text>
            <Text style={styles.level}>Beginner</Text>
          </View>
        </View>
      </View>
      <Navbar />
    </Screen>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  profileBackground: {
    width: "100%",
    height: "25%",
    backgroundColor: "#A062C7",
  },
  profileName: {
    position: "relative",
    bottom: 75,
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: 150,
    height: 150,
  },
  nameText: {
    marginTop: "2%",
    fontSize: 24,
    fontWeight: "700",
  },
  level: {
    fontSize: 16,
    color: "#c8c8c8",
  },
});
