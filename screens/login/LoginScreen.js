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
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

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

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(inputUsername, inputPassword)
      .then(() => {
        console.log("User logged in");
        props.history.push("/HomeScreen");
      })
      .catch((error) => {
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

        <LogoText />
        <TextInput
          style={[styles.input, styles.margin]}
          placeholder="Username"
          onChangeText={(text) => setInputUsername(text)}
          value={inputUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setInputPassword(text)}
          value={inputPassword}
        />
        <TouchableOpacity
          style={styles.loginButton}
          color="dodgerblue"
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
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
    marginTop: 50,
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
