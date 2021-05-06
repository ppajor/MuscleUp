import React, { useEffect } from 'react'
import { Text, View, BackHandler, TouchableOpacity, Image, StyleSheet } from 'react-native'

import Screen from "../../components/Screen";

function AddPlan(props){

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
                <TouchableOpacity 
                style={styles.addEx}
               >
                    <Image  source={require("../../assets/add2Icon.png")} />
                    <Text>Dodaj ćwiczenie</Text>
                 </TouchableOpacity>
            </Screen>
        )
}

export default AddPlan

const styles= StyleSheet.create({
    addEx:{
        width:"100%",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        borderWidth:2,
    }
})