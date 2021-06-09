import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  FlatList,
} from "react-native";

import firebase from "firebase";
import Screen from "../../components/Screen";
import Navbar from "../../components/Navbar";
import LastTrainingRow from "../../components/LastTrainingRow";
import { Ionicons } from "@expo/vector-icons";

function HomeScreen(props) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [lastTrainings, setLastTrainings] = useState("");

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
        setLastTrainings(data.results);
        //  console.log(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onAuthStateChanged = (user) => {
    if (user) {
      setUserLoggedIn(user);
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2%",
            marginBottom: "4%",
          }}
        >
          <Image source={require("../../assets/logo-small.png")} />
          {userLoggedIn && (
            <TouchableOpacity onPress={handleSignOut}>
              <Text style={styles.blackieTextColor}>Sign Out</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.lastTraining}>
          <Text style={{ marginTop: "2%", fontSize: 18, color: "#A062C7" }}>
            Ostatnie treningi
          </Text>

          <FlatList
            data={Object.values(lastTrainings)}
            keyExtractor={(item) => item.result_id}
            renderItem={({ item }) => (
              <LastTrainingRow
                name={item.training_name}
                date={item.endData}
                time={item.trainingTime}
              />
            )}
          />
        </View>

        <Text
          style={{
            marginBottom: "8%",
            fontSize: 24,
            color: "#A062C7",

            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          Rozpocznij swój trening
        </Text>
        <View style={styles.trainingContainer}>
          <TouchableOpacity
            style={styles.treningStart}
            onPress={() => props.history.push("/StartTraining")}
          >
            <Image
              width="50"
              height="50"
              style={styles.icon}
              source={require("../../assets/playBtn.png")}
            />
            <Text style={styles.trainingStartText}>Rozpocznij </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.treningStart, styles.trainingPlan]}
            onPress={() => props.history.push("/ChoosePlan")}
          >
            <Image
              style={styles.icon}
              source={require("../../assets/planIcon.png")}
            />
            <Text style={styles.choosePlanText}>Wybierz plan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.treningStart, styles.trainingPlan]}
            onPress={() => props.history.push("/AddPlan")}
          >
            <Image
              style={styles.icon}
              source={require("../../assets/add2Icon.png")}
            />
            <Text style={styles.choosePlanText}>Utwórz plan</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity style={styles.waterBlock}>
            <View>
              <Ionicons name="water" size={36} color="dodgerblue" />
              <Text style={{ color: "dodgerblue", fontSize: 18 }}>1l / 3l</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.waterBlock, styles.kcalBlock]}>
            <View>
              <Ionicons name="fast-food" size={36} color="#FFBB00" />
              <Text style={{ color: "#FFBB00", fontSize: 18 }}>0/? kcal </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Navbar />
    </Screen>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#f2f2f2",
  },
  lastTraining: {
    height: "35%",
    width: "100%",
    marginBottom: "5%",
    padding: 12,
    borderColor: "#222",
    backgroundColor: "#e8e8e8",
    borderRadius: 10,
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
    fontSize: 18,
    color: "#E1E1E1",
    fontWeight: "700",
  },
  choosePlanText: {
    fontSize: 18,
    color: "#4D4352",
  },
  trainingPlan: {
    backgroundColor: "#E2D3EC",
    borderWidth: 1,
    borderColor: "#A062C7",
  },
  icon: {
    width: 32,
    height: 32,
    marginBottom: 6,
  },
  blackieTextColor: {
    color: "#4D4352",
  },
  waterBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "48%",
    height: "50%",
    padding: "10%",
    marginTop: "10%",
    borderColor: "dodgerblue",
    borderWidth: 2,
    borderRadius: 16,
    backgroundColor: "rgba(30,	144,	255, 0.2)",
  },
  kcalBlock: {
    borderColor: "#FFBB00",
    backgroundColor: "rgba(249, 248, 113,0.2)",
  },
});
