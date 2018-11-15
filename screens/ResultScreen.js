import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { Card, List, ListItem } from "react-native-elements";

export default class ResultScreen extends Component {
  static navigationOptions = {
    title: "Recommendations",
    headerStyle: {
      backgroundColor: "#37d"
    },
    headerTitleStyle: {
      fontWeight: "bold"
    },
    headerTintColor: "#fff"
  };

  render() {
    const { navigation } = this.props;

    const searchInputs = navigation
      .getParam("searchInputs")
      .filter(input => input.value !== "");

    var distance = require("jaro-winkler");
    var data = require("../data/movies.json");
    var movieMatches = []; // array of matched strings of movie names
    var movieRecommendations = []; //array of recommendations of movie names
    var allRecommendations = [];

    // extract movie names from movies.json and write to array
    var movieNames = [];
    for (entry of data) {
      movieNames.push(entry.name);
    }

    console.log(
      "*\n*\t Search Inputs:\n" +
        JSON.stringify(searchInputs)
          .split("},")
          .map(input => input + "}\n")
    );
    console.log(
      "*\n*\t Number of movies considered: " + movieNames.length + "\n*"
    );

    for (i = 0; i < searchInputs.length; i++) {
      // calculate Jaro distance of searchInput[x] and each extracted movie
      var distArr = [];

      for (name of movieNames) {
        distArr.push({
          movie1: searchInputs[i].value,
          movie2: name,
          dist: distance(
            searchInputs[i].value.toLowerCase(),
            name.toLowerCase()
          )
        });
      }

      // choose movie with highest distance value (remove rest of array)
      movieMatches[i] = distArr.sort((a, b) => {
        if (a.dist < b.dist) return 1;
        if (a.dist > b.dist) return -1;
        return 0;
      })[0].movie2;

      // get recommendations
      movieRecommendations[i] = data
        .filter(movie => movie.name === movieMatches[i])[0]
        .top10Recommendations.split("|");

      // add to allRecommendations
      allRecommendations = allRecommendations.concat(movieRecommendations[i]);
    }

    for (i = 0; i < movieMatches.length; i++) {
      console.log("Best Match " + i + ": " + JSON.stringify(movieMatches[i]));
      console.log("*\n*\tRecommendations: \n*\n");
      console.log(movieRecommendations[i]);
    }

    console.log("*\n*\tAll Recommendations: \n*\n");
    console.log(allRecommendations);

    // count occurrences in allRecommendations
    var counts = [];

    for (i = 0; i < allRecommendations.length; i++) {
      var searchResult = counts.filter(x => x.name === allRecommendations[i]);
      if (searchResult.length === 0) {
        counts.push({ name: allRecommendations[i], count: 1 });
      } else {
        for (x of counts) {
          if (x.name === searchResult[0].name) {
            //console.log(x.name === searchResult[0].name);
            x.count++;
          }
        }
      }
    }

    // get shuffled and then sorted Top 10
    shuffle(counts).sort((a, b) => {
      if (a.count < b.count) return 1;
      if (a.count > b.count) return -1;
      return 0;
    });

    console.log("*\n*\tOccurrence Counts: \n*\n");
    console.log(counts);

    // get results as movie objects
    var sortedTop10 = [];
    var counter = 0;

    for (movie of counts) {
      if (counter === 10) break;
      try {
        var m = data.filter(x => x.name === movie.name)[0];
        console.log(m.name);
        sortedTop10.push(m);
        counter++;
      } catch (error) {
        console.log("Movie not found");
      }
    }

    console.log(sortedTop10[5].name);
    var key = 0;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.infoText}>
          Your Inputs: {"\n"}
          {movieMatches.toString()}
        </Text>
        {sortedTop10.map(film => (
          <Card key={++key} title={film.name + " " + "(" + film.year + ")"}>
            <View styles={styles.cardText}>
              <Text style={styles.categories}> Director: </Text>
              <Text style={styles.text}>
                {" "}
                {film.director.replace("_", " ")}{" "}
              </Text>
              <Text style={styles.categories}> Actors: </Text>
              <Text>
                {film.actorsWiki
                  .split("|")
                  .slice(0, 5)
                  .toString()}
              </Text>
              <Text style={styles.categories}> Genres: </Text>
              <Text style={styles.text}>
                {film.genres.split("|").toString()}
              </Text>
              <Text style={styles.categories}> Length: </Text>
              <Text style={styles.text}> {film.runtime} min </Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    );
  }
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const styles = StyleSheet.create({
  infoText: {
    fontFamily: "monospace",
    fontSize: 18,
    color: "#555",
    paddingVertical: 10,
    textAlign: "center"
  },
  categories: {
    fontWeight: "bold",
    fontSize: 16
  },
  text: {
    fontSize: 15
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  cardText: {}
});
