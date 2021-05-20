import React, { useEffect, useState } from "react";
import {
  View,
  BackHandler,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import Timer from "../../components/Timer";
import Screen from "../../components/Screen";
import TrainingExercise from "./TrainingExercise";
import firebase from "firebase";

function StartTraining(props) {
  const [data, setData] = useState({});
  const [selectedPlan, setSelectedPlan] = useState("");
  const [loaded, setLoaded] = useState(false);

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
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid + "/trainings")
      .once("value")
      .then((snapshot) => {
        let data = snapshot.val(); // co zrobic gdy uzytkownik nie ma nic w czytanych i jest null??
        // console.log(data);
        setData(data);
        setSelectedPlan(data.selectedTraining);
        setLoaded(true);

        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .update({
            lastTraining: data.selectedTraining,
          })
          .then(() => {
            console.log("Data updated.");
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  let screenWidth = Dimensions.get("window").width;
  let screenHeight = Dimensions.get("window").height;

  return (
    <>
      {loaded && (
        <Screen>
          <View style={{ height: screenHeight, marginTop: 20 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {Object.values(data[selectedPlan].exercises).map((el) => {
                console.log(el);

                return <TrainingExercise key={el.id} exercise={el} />;
              })}
            </ScrollView>
          </View>
        </Screen>
      )}
    </>
  );
}

export default StartTraining;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  exContainer: {
    width: "90%",
    backgroundColor: "red",
    height: 200,
  },
  exContainer2: {
    width: "100%",
    backgroundColor: "blue",
    height: 200,
  },
});
