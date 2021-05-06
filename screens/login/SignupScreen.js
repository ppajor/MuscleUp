import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  BackHandler,
} from "react-native";
import firebase from "firebase";

import LogoText from "../../components/LogoText";
import Screen from "../../components/Screen";

export default function LoginPage(props) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const backAction = () => {
      props.history.push("/"); //wracamy do glownej
      return true; //musimy zreturnowac true -> patrz dokumentacja
    };

    const backHandler = BackHandler.addEventListener(
      //obsluga hardwarowego back buttona (tylko android)
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // przy odmontowywaniu
  }, []);

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(inputEmail, inputPassword)
      .then((result) => {
        firebase
          .database()
          .ref("/users/" + result.user.uid)
          .set({
            text: `hey ${result.user.uid}`,
            name: inputEmail,
            trainings:"",
          })
          .then(() => console.log("User account created & signed in!"));
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
          setError("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
          setError("That email address is invalid!");
        }

        console.error(error);
      });
  };

  return (
      <Screen>
    <View style={styles.container}>
      <Image
        width="50"
        style={styles.logo}
        source={require("../../assets/login-logo.png")}
      ></Image>
    <LogoText/>
      <TextInput
        style={[styles.input, styles.margin]}
        placeholder="E-mail"
        value={inputEmail}
        onChangeText={(text) => setInputEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={inputPassword}
        onChangeText={(text) => setInputPassword(text)}
      />
      <TouchableOpacity
        onPress={handleSignUp}
        style={styles.loginButton}
        color="dodgerblue"
      >
        <Text style={styles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text>{error}</Text>
    </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
    marginTop:50,
    backgroundColor: "#fff",
  },
  margin: {
    marginTop: 50,
  },
  input: {
    marginTop: 10,
    width: "75%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 5,
    color: "#000",
  },
  loginButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 20,
    width: "75%",
    height: 35,
    backgroundColor: "#000",
  },
  loginButtonText: {
    color: "#fff",
  },
});
