import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Link } from "react-router-native";
import firebase from "firebase";

import Screen from "../../components/Screen";
import LogoText from "../../components/LogoText";

const WelcomePage = (props) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        props.history.push("/HomeScreen");
      } else {
        // No user is signed in.
      }
    });
  }, []);

  handleAnonymousSignIn = () => {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        console.log("User signed in anonymously");
        props.history.push("/HomeScreen");
      })
      .catch((error) => {
        if (error.code === "auth/operation-not-allowed") {
          console.log("Enable anonymous in your firebase console.");
        }

        console.error(error);
      });
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Image source={require("../../assets/login-logo.png")}></Image>
        <LogoText />

        <Link to="/LoginScreen" style={styles.loginBtn}>
          <TouchableOpacity>
            <Text style={styles.loginBtnText}>Zaloguj się przez email</Text>
          </TouchableOpacity>
        </Link>
        <Link to="/SignupScreen" style={[styles.loginBtn, styles.signupBtn]}>
          <TouchableOpacity>
            <Text>Zarejestruj się </Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity onPress={handleAnonymousSignIn}>
          <Text style={styles.skipButtonText}>Skip ></Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
  containerLogoText: {
    marginTop: -50,
  },
  loginBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20%",
    width: "75%",
    height: "6%",
    backgroundColor: "#000",
  },
  loginBtnText: {
    color: "#fff",
  },
  signupBtn: {
    marginTop: 15,
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  skipButtonText: {
    marginTop: 15,
    color: "#ccc",
  },
});

export default WelcomePage;
