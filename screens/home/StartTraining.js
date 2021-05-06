import React, {useEffect} from 'react'
import { View , BackHandler} from 'react-native'
import Timer from '../../components/Timer'
import Screen from "../../components/Screen";

function StartTraining(props) {
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
            <Timer />
        </Screen>
    )
}

export default StartTraining
