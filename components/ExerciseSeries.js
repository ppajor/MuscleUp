import React from 'react'
import Screen from "../components/Screen";
import { Text, TextInput, View, StyleSheet } from 'react-native';

function ExerciseSeries(props) {
    return (
        
        <View style={styles.container}>
            <Text>{props.series.series_kg}kg</Text>
             <Text>{props.series.series_repeat}powtorzen</Text>
        </View>
    )
}

export default ExerciseSeries

const styles= StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        marginLeft:32,
    }
})