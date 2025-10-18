import React from "react";
import { MemoryRouter, Route, Switch } from "react-router-native"; //dzieki memoryrouter mozna uzywać historii w Child componentach, na normalnym routerze historia dziala jedynie w parent componentach

import StartScreen from "./screens/login/StartScreen.js";
import LoginScreen from "./screens/login/LoginScreen.js";
import SignupScreen from "./screens/login/SignupScreen.js";
import HomeScreen from "./screens/home/HomeScreen";
import AddPlan from "./screens/home/AddPlan";
import ChoosePlan from "./screens/home/ChoosePlan";
import StartTraining from "./screens/home/StartTraining";
import ProfileScreen from "./screens/profile/ProfileScreen";
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

        <Route exact path="/ProfileScreen" component={ProfileScreen} />
      </Switch>
    </MemoryRouter>
  );
}

// comments
// import jsconfig.json for automatic componnet import
