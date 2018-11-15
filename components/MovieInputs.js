import React, { Component } from "react";
import { TextInput, View, StyleSheet } from "react-native";

class MovieInput extends Component {
  render() {
    return (
      <TextInput
        placeholder={this.props.placeholder}
        onChangeText={text => this.props.onChangeText(text, this.props.id)}
        value={this.props.value}
        style={styles.input}
        underlineColorAndroid="#ccc"
      />
    );
  }
}

export default MovieInput;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    fontSize: 17
  }
});
