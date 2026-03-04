import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FeatureCard() {
  return (
    <View style={styles.container}>
    <View style={{ width: 40, alignItems: 'center' }}>
      <Ionicons name="checkmark-outline" size={30} color="#034C7B" />
    </View>
      <Text>Track Your Progress</Text>
    </View>
  );
}

const styles  = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // For Android shadow
        borderWidth: 1,
        borderColor: "#ddd",
        // marginVertical: 20,
    }
});
