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
      .ref("/users/" + firebase.auth().currentUser.uid)
      .once("value")
      .then((snapshot) => {
        let data = snapshot.val(); // co zrobic gdy uzytkownik nie ma nic w czytanych i jest null??
        //console.log(data.trainings[data.selectedTraining]);
        setData(data.trainings);
        setSelectedPlan(data.selectedTraining);
        setLoaded(true);

        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .update({
            lastTraining: data.selectedTraining,
          })
          .then(() => {
            console.log("Ostatni trening dodany do bazy .");
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleEndTraining = (time) => {
    let state = { ...data };
    let today = new Date().toLocaleDateString();

    state[selectedPlan].endData = today;
    state[selectedPlan].trainingTime = time;
    state[selectedPlan].training_id = selectedPlan;
    const id = Math.random().toString(36).substr(2, 9); //tworzenie id
    state[selectedPlan].result_id = id;
    // let result = {};
    //  result[selectedPlan] = state[selectedPlan];
    //console.log(result);

    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid + "/results/")
      .update({
        [id]: state[selectedPlan],
      })
      .then(() => {
        console.log("Wyniki dodane do bazy.");
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
                // console.log(el);
                return (
                  <TrainingExercise
                    key={el.id}
                    id={el.id}
                    exercise={el}
                    endTraining={(time) => handleEndTraining(time)}
                    isExerciseDone={() => {
                      let state = { ...data };
                      let done = el.isDone;
                      state[selectedPlan].exercises[el.id].isDone = !done;

                      //  console.log(el);
                      setData(state);
                    }}
                  />
                );
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
