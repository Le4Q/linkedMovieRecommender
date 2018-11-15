import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

import MovieScreen from "../screens/MovieScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ResultScreen from "../screens/ResultScreen";

const MovieStack = createStackNavigator({
  Movie: MovieScreen,
  Result: ResultScreen
});

MovieStack.navigationOptions = {
  tabBarLabel: "Movies",
  tabBarIcon: ({ focused }) => <Icon name="film" size={25} />
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => <Icon name="sliders" size={25} />
};

export default createBottomTabNavigator(
  {
    Movie: MovieStack,
    Settings: SettingsStack
  },
  {
    tabBarOptions: {
      //activeTintColor: "#6b3"
    }
  }
);
