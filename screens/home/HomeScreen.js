import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
} from "react-native";

import firebase from "firebase";
import Screen from "../../components/Screen";

function HomeScreen(props) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [lastTraining, setLastTraining] = useState("");

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  useEffect(() => {
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .once("value")
      .then((snapshot) => {
        let data = snapshot.val(); // co zrobic gdy uzytkownik nie ma nic w czytanych i jest null??
        setLastTraining(data.lastTraining);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onAuthStateChanged = (user) => {
    if (user) {
      setUserLoggedIn(user);
      console.log(user);
    } else {
      console.log("No user logged in");
    }
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("User signed out!");
        props.history.push("/");
      });
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Image source={require("../../assets/logo-small.png")} />
        {userLoggedIn && (
          <TouchableOpacity onPress={handleSignOut}>
            <Text>Hello {userLoggedIn.email}</Text>
            <Text>Sign Out</Text>
          </TouchableOpacity>
        )}
        <View style={styles.lastTraining}>
          <Text>{lastTraining}</Text>
        </View>
        <View style={styles.trainingContainer}>
          <TouchableOpacity
            style={styles.treningStart}
            onPress={() => props.history.push("/StartTraining")}
          >
            <Image
              style={styles.icon}
              source={require("../../assets/playBtn.png")}
            />
            <Text style={styles.trainingStartText}>Rozpocznij trening</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.treningStart, styles.trainingPlan]}
            onPress={() => props.history.push("/ChoosePlan")}
          >
            <Image
              style={styles.icon}
              source={require("../../assets/planIcon.png")}
            />
            <Text>Wybierz plan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.treningStart, styles.trainingPlan]}
            onPress={() => props.history.push("/AddPlan")}
          >
            <Image
              style={styles.icon}
              source={require("../../assets/add2Icon.png")}
            />
            <Text>Utwórz plan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 12,
  },
  lastTraining: {
    height: "27%",
    width: "100%",
    borderWidth: 1,
    marginBottom: 36,
    marginTop: 36,
    padding: 20,
  },
  trainingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  treningStart: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "32%",
    height: 150,
    backgroundColor: "#A062C7",
    borderRadius: 9,
  },
  trainingStartText: {
    fontSize: 14,
    color: "#E1E1E1",
  },
  trainingPlan: {
    backgroundColor: "#E2D3EC",
  },
  icon: {
    marginBottom: 6,
  },
});
