import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  BackHandler,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Screen from "../../components/Screen";
import ChooseCategory from "../../components/ChooseCategory";
import ChooseExercise from "../../components/ChooseExercise";

import firebase from "firebase";

const categories = [
  {
    name: "nogi",
    key: "dnfhiwebfebr",
    icon: require("../../assets/leg.png"),
    exercises: ["wyciskanie", "podsiad", "przysiad"],
  },
  {
    name: "plecy",
    key: "jksdnhhsbfs",
    icon: require("../../assets/back.png"),
    exercises: ["a", "b", "c"],
  },
  {
    name: "Klata",
    key: "sdhfuifdes",
    icon: require("../../assets/chest.png"),
    exercises: ["b", "c", "d"],
  },
  {
    name: "barki",
    key: "jeirehiurere",
    icon: require("../../assets/shoulder.png"),
    exercises: ["a", "b", "c"],
  },
  {
    name: "tricek",
    key: "bwdjhebfj",
    icon: require("../../assets/triceps.png"),
    exercises: ["a", "b", "c"],
  },
  {
    name: "bicek",
    key: "ojetroerj",
    icon: require("../../assets/biceps2.png"),
    exercises: ["a", "b", "c"],
  },
  {
    name: "brzuch",
    key: "kjndsjkfnsdkjsd",
    icon: require("../../assets/leg.png"),
    exercises: ["a", "b", "c"],
  },
];

const training = {
  exercises: {
    ex_id: {
      id: "ex_id",
      category: "nogi",
      icon: require("../../assets/chest.png"),
      exercise_name: "Wybierz ćwiczenie",
      series: {
        series_id: {
          id: "series_id",
          kg: 0,
          repeat: 0,
        },
      },
    },
  },
  training_name: "",
};

function AddPlan(props) {
  const [modalVisible, setModalVisible] = useState({ ex_id: false });
  const [modalExerciseVisible, setModalExerciseVisible] = useState({
    ex_id: false,
  });
  const [category, setCategory] = useState("klatka");
  const [exercise, setExercise] = useState("Wybierz ćwiczenie");
  const [series, setSeries] = useState([{ kg: 0, repeats: 0 }]);
  const [icon, setIcon] = useState(require("../../assets/chest.png"));
  const [trainingData, setTrainingData] = useState(training);

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

  const renderTrainingName = () => {
    return (
      <TextInput
        style={{ marginBottom: "10%", fontSize: 36, fontWeight: "bold" }}
        placeholder="Nazwa planu"
        onChangeText={(el) => {
          let state = { ...trainingData };
          state.training_name = el;
          setTrainingData(state);
        }}
        value={trainingData.training_name}
      />
    );
  };

  const renderExercisePicker = (exId) => {
    return (
      <View style={styles.addCatEx}>
        <TouchableWithoutFeedback
          style={styles.categoryContainer}
          onPress={() => {
            setModalVisible((prev) => ({ ...prev, [exId]: true }));
          }}
        >
          <View style={styles.addEx}>
            <Image
              style={styles.categoryImg}
              source={trainingData.exercises[exId].icon}
            />
            <Text>{trainingData.exercises[exId].category}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            setModalExerciseVisible((prev) => ({ ...prev, [exId]: true }))
          }
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>
            {trainingData.exercises[exId].exercise_name}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const renderCategoryModal = (exId) => {
    return (
      <Modal visible={modalVisible[exId]} animationType="slide">
        <Button
          title="Close"
          onPress={() =>
            setModalVisible((prev) => ({ ...prev, [exId]: false }))
          }
        />
        <FlatList
          contentContainerStyle={styles.list}
          columnWrapperStyle={{ justifyContent: "space-around" }}
          numColumns={3}
          data={categories}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => {
            return (
              <ChooseCategory
                name={item.name}
                key={item.key}
                icon={item.icon}
                onPress={() => {
                  let state = { ...trainingData };
                  state.exercises[exId].category = item.name;
                  state.exercises[exId].icon = item.icon;
                  setTrainingData(state);
                  setModalVisible((prev) => ({ ...prev, [exId]: false }));
                }}
              />
            );
          }}
        />
      </Modal>
    );
  };

  const renderExerciseModal = (exId) => {
    return (
      <Modal visible={modalExerciseVisible[exId]} animationType="slide">
        <Button
          title="Close"
          onPress={() =>
            setModalExerciseVisible((prev) => ({ ...prev, [exId]: false }))
          }
        />
        <FlatList
          data={categories}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => {
            if (item.name == trainingData.exercises[exId].category)
              return (
                <ChooseExercise
                  exercises={item.exercises}
                  key={item.key}
                  handleExercise={(ex) => {
                    let state = { ...trainingData };
                    state.exercises[exId].exercise_name = ex;
                    console.log(ex);
                    setTrainingData(state);
                    setModalExerciseVisible((prev) => ({
                      ...prev,
                      [exId]: false,
                    }));
                  }}
                />
              );
          }}
        />
      </Modal>
    );
  };

  const renderSeriesButton = (exId) => {
    return (
      <TouchableHighlight
        style={styles.addSeriesBtn}
        onPress={() => {
          let state = { ...trainingData };
          const id = Math.random().toString(36).substr(2, 9); //tworzenie id
          state.exercises[exId].series[id] = { kg: 0, repeat: 0 }; //dodawanie serii
          setTrainingData(state);
        }}
      >
        <>
          <View style={styles.addSeriesIcon}>
            <Ionicons name="add" size={24} color="black" />
          </View>
          <Text>Dodaj serie</Text>
        </>
      </TouchableHighlight>
    );
  };

  const renderAddExerciseButton = () => {
    return (
      <TouchableHighlight
        style={styles.addSeriesBtn}
        onPress={() => {
          let state = { ...trainingData };
          const id = Math.random().toString(36).substr(2, 9); //tworzenie id
          state.exercises[id] = {
            id: id,
            exercise_name: "Wybierz ćwiczenie",
            category: "nogi",
            icon: require("../../assets/leg.png"),
            series: {},
          }; //dodawanie serii
          setTrainingData(state);
          setModalVisible((prev) => ({ ...prev, [id]: false }));
          setModalExerciseVisible((prev) => ({ ...prev, [id]: false }));
        }}
      >
        <>
          <View style={styles.addSeriesIcon}>
            <Ionicons name="add" size={24} color="black" />
          </View>
          <Text>Dodaj cwiczenie</Text>
        </>
      </TouchableHighlight>
    );
  };

  const handleSaveTraining = () => {
    const id = Math.random().toString(36).substr(2, 9); //tworzenie id
    console.log("PRESSED");
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid + "/trainings")
      .update({
        [id]: { ...trainingData },
      })
      .then(() => {
        console.log("Data updated.");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Screen>
      <View style={styles.mainContainer}>
        {renderTrainingName()}
        <View style={{ maxHeight: "65%" }}>
          <FlatList
            ListHeaderComponentStyle={styles.flatlist}
            data={Object.values(training.exercises)}
            keyExtractor={(el) => el.id}
            renderItem={({ item }) => (
              <View style={{ paddingVertical: 16 }}>
                {renderExercisePicker(item.id)}

                <View style={styles.seriesContainer}>
                  {Object.values(trainingData.exercises[item.id].series).map(
                    (ex, idx) => {
                      //console.log(ex.kg);
                      // console.log(Object.keys(ex));
                      return (
                        <View
                          key={idx}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <TextInput
                            onChangeText={(el) => {
                              let state = { ...trainingData };
                              let key = Object.keys(
                                state.exercises[item.id].series
                              )[idx];
                              state.exercises[item.id].series[key].kg = el;

                              setTrainingData(state);
                            }}
                            value={ex.kg.toString()}
                          />
                          <Text>kg</Text>
                          <TextInput
                            onChangeText={(el) => {
                              let state = { ...trainingData };
                              let key = Object.keys(
                                state.exercises[item.id].series
                              )[idx];
                              state.exercises[item.id].series[key].repeat = el;

                              setTrainingData(state);
                            }}
                            value={ex.repeat.toString()}
                          />
                          <Text>powtorzen</Text>
                        </View>
                      );
                    }
                  )}
                  {renderSeriesButton(item.id)}
                </View>

                {renderCategoryModal(item.id)}
                {renderExerciseModal(item.id)}
              </View>
            )}
          />
        </View>
        {renderAddExerciseButton()}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => handleSaveTraining()}
        >
          <Text style={styles.loginButtonText}>Zapisz trening</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

export default AddPlan;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: "5%",
  },
  addCatEx: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#A062C7",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,

    shadowColor: "#c8c8c8",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  categoryContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderWidth: 2,
  },
  addEx: {
    width: 75,
    height: 75,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "5%",
    borderRadius: 200,
    backgroundColor: "#f2f2f2",
  },
  list: {
    width: "100%",
    display: "flex",
  },
  categoryImg: {
    width: 32,
    height: 32,
  },
  seriesContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  addSeriesBtn: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    padding: 4,
    margin: "5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.23,
    shadowRadius: 9.51,

    elevation: 15,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  addSeriesIcon: {
    width: 32,
    height: 32,
    backgroundColor: "#fafafa",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  loginButton: {
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
  flatlist: {
    backgroundColor: "red",
  },
});

//COMMENTS
/*
we FLatList trzeba wstawić 
          contentContainerStyle={styles.list}
ze swoimi stylami. Inaczej źle wyświetla flexa

*/
