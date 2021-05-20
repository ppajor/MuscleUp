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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Screen from "../../components/Screen";
import ChooseCategory from "../../components/ChooseCategory";

const categories = [
  {
    name: "nogi",
    icon: "",
  },
  {
    name: "plecy",
    icon: "",
  },
  {
    name: "Klata",
    icon: "",
  },
  {
    name: "barki",
    icon: "",
  },
  {
    name: "tricek",
    icon: "",
  },
  {
    name: "bicek",
    icon: "",
  },
  {
    name: "brzuch",
    icon: "",
  },
];

function AddPlan(props) {
  const [modalVisible, setModalVisible] = useState(false);

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
      <TextInput placeholder="Nazwa planu" />
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.addEx}>
          <Ionicons name="add" size={24} color="black" />
          <Text>Dodaj ćwiczenie</Text>
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Button title="Close" onPress={() => setModalVisible(false)} />
        <FlatList
          contentContainerStyle={styles.list}
          columnWrapperStyle={{ justifyContent: "space-around" }}
          numColumns={3}
          data={categories}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => {
            return <ChooseCategory name={item.name} />;
          }}
        />
      </Modal>
    </Screen>
  );
}

export default AddPlan;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
  },
  addEx: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    width: "100%",
    display: "flex",
  },
});

//COMMENTS
/*
we FLatList trzeba wstawić 
          contentContainerStyle={styles.list}
ze swoimi stylami. Inaczej źle wyświetla flexa

*/
