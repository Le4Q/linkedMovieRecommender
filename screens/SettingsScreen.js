import React from "react";
import { View, Text } from "react-native";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings?"
  };

  render() {
    return (
      <View>
        <Text style={{ fontSize: 70 }}>HI GUYS</Text>
      </View>
    );
  }
}
