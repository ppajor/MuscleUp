import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  BackHandler,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import Screen from "../../components/Screen";
import firebase from "firebase";
import Plans from "../../components/Plans";

function ChoosePlan(props) {
  const [trainings, setTrainings] = useState({});
  const [loaded, setLoaded] = useState(false);
  //const [highlight, setHighlight] = useState(false);
  const [selected, setSelected] = useState("");

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

  useEffect(() => {
    console.log(firebase.auth().currentUser.uid);

    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid + "/trainings")
      .once("value")
      .then((snapshot) => {
        let data = snapshot.val(); // co zrobic gdy uzytkownik nie ma nic w czytanych i jest null??
        //console.log(data);
        setTrainings(data);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePickTraining = () => {
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .update({
        selectedTraining: selected,
      })
      .then(() => {
        console.log("Data updated.");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {loaded && (
        <Screen>
          <View style={{ padding: "5%", height: "85%" }}>
            <FlatList
              data={Object.keys(trainings)}
              keyExtractor={(ex) => ex}
              renderItem={({ item }) => (
                <Plans
                  data={trainings[item]}
                  id={item}
                  onPress={() => {
                    console.log("wbilem");
                    setSelected(item);
                  }}
                />
              )}
            />
          </View>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => handlePickTraining()}
          >
            <Text style={styles.loginButtonText}>Zapisz trening</Text>
          </TouchableOpacity>
        </Screen>
      )}
    </>
  );
}

export default ChoosePlan;

const styles = StyleSheet.create({
  heading: {
    fontSize: 36,
  },
  saveButton: {
    position: "absolute",
    bottom: "5%",
    left: "12.5%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
    height: "6%",
    backgroundColor: "#A062C7",
    borderRadius: 24,
  },
  loginButtonText: {
    color: "#fff",
  },
});
