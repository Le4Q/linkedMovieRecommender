
# react-native-winter-movies

## Getting started

`$ npm install react-native-winter-movies --save`

### Mostly automatic installation

`$ react-native link react-native-winter-movies`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-winter-movies` and add `RNWinterMovies.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNWinterMovies.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNWinterMoviesPackage;` to the imports at the top of the file
  - Add `new RNWinterMoviesPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-winter-movies'
  	project(':react-native-winter-movies').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-winter-movies/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-winter-movies')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNWinterMovies.sln` in `node_modules/react-native-winter-movies/windows/RNWinterMovies.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Winter.Movies.RNWinterMovies;` to the usings at the top of the file
  - Add `new RNWinterMoviesPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNWinterMovies from 'react-native-winter-movies';

// TODO: What to do with the module?
RNWinterMovies;
```
  