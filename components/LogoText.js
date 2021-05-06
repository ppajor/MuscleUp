import React from 'react';
import {View,Text,StyleSheet} from "react-native";

function LogoText() {
    return (
        <View style={styles.containerLogoText}>
        <Text style={styles.logoText} >Keep yourself motivated</Text>
        <Text style={styles.logoText}> and train your body</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    containerLogoText:{
        marginTop:-50,
    },
    containerLogoText:{
        marginTop:-50,
    },
    logoText:{
        fontSize:20,
        textAlign:"center",
        color:"#767676",
    },
})

export default LogoText
