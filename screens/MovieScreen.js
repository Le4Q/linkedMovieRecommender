import React from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid
} from "react-native";
import MovieInput from "../components/MovieInputs";

export default class MovieScreen extends React.Component {
  static navigationOptions = {
    title: "Linked Data Movie Recommender",
    headerStyle: {
      backgroundColor: "#37d"
    },
    headerTitleStyle: {
      fontWeight: "bold"
    },
    headerTintColor: "#fff"
  };

  state = {
    inputs: [
      { id: 1, value: "" }, // movies 1-5
      { id: 2, value: "" },
      { id: 3, value: "" },
      { id: 4, value: "" },
      { id: 5, value: "" }
    ],
    genre: "",
    year: ""
  };

  render() {
    return (
      <ScrollView style={styles.background}>
        <Text style={styles.infoText}>
          Get movie recommendations based on movies you have seen.
        </Text>
        <View style={styles.moviesWrap}>
          {this.state.inputs.map(x => {
            if (x.id < 6) {
              return (
                <MovieInput
                  key={x.id}
                  id={x.id}
                  placeholder={"Movie " + x.id}
                  onChangeText={this._handleInputChange}
                  //style={styles.input}
                />
              );
            }
          })}
        </View>
        {/*
        <View style={styles.inputWrap}>
          <MovieInput
            id={6}
            placeholder={"Genre"}
            onChangeText={text => this.setState({ genre: text })}
          />
          <MovieInput
            id={7}
            placeholder={"Year"}
            onChangeText={text => this.setState({ year: text })}
          />
        </View> */}
        <View style={styles.buttonWrap}>
          <Button title="Run!" onPress={this._onRun} color="#37d" />
        </View>
      </ScrollView>
    );
  }

  _handleInputChange = (text, id) => {
    const newState = this.state.inputs.map(function(input) {
      obj = input;
      if (input.id === id) {
        obj.value = text;
      }
      return obj;
    });
    this.setState({ inputs: newState });
  };

  _onRun = () => {
    var isEmpty = true;
    var arr = this.state.inputs;
    console.log(typeof this.state.inputs);

    for (input of arr) {
      if (input.value !== "") {
        isEmpty = false;
        break;
      }
    }
    console.log(isEmpty);
    if (isEmpty) {
      ToastAndroid.show("Enter at least one Movie!", ToastAndroid.SHORT);
      return 0;
    } else {
      this.props.navigation.navigate("Result", {
        searchInputs: this.state.inputs,
        genre: this.state.genre,
        year: this.state.year
      }); //parameters to be passed go here
    }
  };
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff"
  },
  infoText: {
    fontFamily: "monospace",
    fontSize: 18,
    color: "#555",
    paddingVertical: 10
  },
  moviesWrap: {
    marginVertical: 4,
    height: 260,
    backgroundColor: "transparent"
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 8,
    height: 42,
    backgroundColor: "transparent"
  },
  buttonWrap: {
    //paddingVertical: 15,
    marginTop: 20
  }
});
