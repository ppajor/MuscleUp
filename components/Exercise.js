import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image, FlatList } from 'react-native'
import ExerciseSeries from './ExerciseSeries'

function Exercise(props) {
    return (
        <View>
            <View style={styles.container}>
            <Image source={require("../assets/dumbbell.png")} />
                 <Text>{props.name}</Text>
            </View>
            <FlatList
            data={Object.values(props.series)}
            keyExtractor={(el)=>el.id}
            renderItem={({item})=>
            <ExerciseSeries series={item}/>
             }
        />


        </View>
    )
}

export default Exercise

const styles= StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",

    }
})