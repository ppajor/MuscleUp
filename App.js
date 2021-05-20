import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Route, Switch, MemoryRouter } from "react-router-native"; //dzieki memoryrouter mozna uzywać historii w Child componentach, na normalnym routerze historia dziala jedynie w parent componentach

import { firebaseConfig } from "./firebase-config";
import firebase from "firebase";

import StartScreen from "./screens/login/StartScreen.js";
import LoginScreen from "./screens/login/LoginScreen.js";
import SignupScreen from "./screens/login/SignupScreen.js";
import HomeScreen from "./screens/home/HomeScreen";
import AddPlan from "./screens/home/AddPlan";
import ChoosePlan from "./screens/home/ChoosePlan";
import StartTraining from "./screens/home/StartTraining";

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig); //musimy sprawdzic czy aplikacja zostala juz zainicjowana czy nie, zeby za kazdym razem nie inicjowac apki

export default function App() {
  return (
    <MemoryRouter>
      <Switch>
        <Route exact path="/" component={StartScreen} />
        <Route exact path="/LoginScreen" component={LoginScreen} />
        <Route exact path="/SignupScreen" component={SignupScreen} />
        <Route exact path="/HomeScreen" component={HomeScreen} />
        <Route exact path="/AddPlan" component={AddPlan} />
        <Route exact path="/ChoosePlan" component={ChoosePlan} />
        <Route exact path="/StartTraining" component={StartTraining} />
      </Switch>
    </MemoryRouter>
  );
}
