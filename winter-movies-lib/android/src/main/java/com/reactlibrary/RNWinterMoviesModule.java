
package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import de.uni_mannheim.informatik.dws.semtec.Recommender.Models.LinearCombinationRule;

public class RNWinterMoviesModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNWinterMoviesModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNWinterMovies";
  }

}