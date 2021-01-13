import * as React from "react";
import { WebView } from "react-native-webview";
import { ScrollView, ActivityIndicator, Text } from "react-native";
import { View } from "react-native";
import colors from "../assets/colors";

const MapView = () => {
  return (
    <ScrollView
      style={{
        backgroundColor: colors.lightGray,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 15,
      }}
    >
      {/* Tiers view */}
      <View
        style={{
          width: "100%",
          backgroundColor: colors.white,
          padding: 3,
        }}
      >
        <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 20 }}>Tiers in England</Text>
      </View>

      {/* WebView displaying Tiers container */}
      <WebView
        source={{
          uri: "https://datawrapper.dwcdn.net/uTv4K/14/",
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={{
          marginTop: 10,
          paddingTop: 30,
          backgroundColor: colors.lightGray,
          height: 500,
          width: "100%",
        }}
        scalesPageToFit={true}
        renderLoading={() => <ActivityIndicator size="large" color={colors.lightBlue} />}
        startInLoadingState={true}
      />
    </ScrollView>
  );
};

export default MapView;
