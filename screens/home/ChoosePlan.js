import React, { useState, useEffect } from 'react'
import {Text, StyleSheet,BackHandler, FlatList } from "react-native";
import Screen from "../../components/Screen";
import firebase from "firebase";
import Exercise from '../../components/Exercise';

function ChoosePlan(props) {
    const [trainings, setTrainings] = useState({});
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

    useEffect(()=>{
        console.log(firebase.auth().currentUser.uid);

        firebase
        .database()
        .ref("/users/" + firebase.auth().currentUser.uid +"/trainings")
        .once("value")
        .then((snapshot) => {
            let data = snapshot.val(); // co zrobic gdy uzytkownik nie ma nic w czytanych i jest null??
           // console.log(snapshot)
            setTrainings(data);
            setLoaded(true);

        })
        .catch((error) => {
            console.error(error);
        });
    },[]);

    return (
        <>
        {loaded && (
        <Screen>
            <Text style={styles.heading}>{trainings.training_id.training_name}</Text>
            <FlatList
            data={Object.values(trainings.training_id.exercises)}
            keyExtractor={ex=>ex.id}
            renderItem={({item})=>
            (
                <Exercise
                name={item.exercise_name}
                series={item.series}
                />
            )}
            />
           
        </Screen>
        )}
        </>
        
    )
}

export default ChoosePlan

const styles = StyleSheet.create({
    heading:{
        fontSize:36,
    }
})