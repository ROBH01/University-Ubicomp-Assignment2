import * as React from "react";
import { WebView } from "react-native-webview";
import { ScrollView, ActivityIndicator, Text } from "react-native";
import { View } from "react-native";

const MapView = () => {
  return (
    <ScrollView
      style={{
        backgroundColor: "lightgray",
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 15,
      }}
    >
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          padding: 3,
          //height: 40,
        }}
      >
        <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 20 }}>
          Tiers in England
        </Text>
      </View>
      <WebView
        source={{
          uri: "https://datawrapper.dwcdn.net/uTv4K/14/",
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={{
          //justifyContent: "center",
          //alignSelf: "center",
          //alignItems: "center",
          flex: 1,
          //marginTop: 30,
          marginTop: 10,
          paddingTop: 30,
          backgroundColor: "lightgray",
          height: 500,
          width: "100%",
        }}
        scalesPageToFit={true}
        renderLoading={() => <ActivityIndicator size="large" color="#2196F3" />}
        startInLoadingState={true}
      />
    </ScrollView>
  );
};

export default MapView;

//https://www.covidlive.co.uk/
//https://www.ons.gov.uk/visualisations/dvc1099/covid-death-map/index.html
//https://datawrapper.dwcdn.net/uTv4K/14/
