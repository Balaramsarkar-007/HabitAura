import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Footer() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>© 2025 HabitAura. All rights reserved.</Text>
      <Text style={styles.text}>Made with ❤️ by Mr. Balaram</Text>

      <View style={styles.fontContainer}>
        <TouchableOpacity
          onPress={() =>
            router.navigate("https://www.linkedin.com/in/balaramsarkar/")
          }
        >
          <Ionicons
            name="logo-linkedin"
            size={24}
            color="white"
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.navigate("https://github.com/Balaramsarkar-007")
          }
        >
          <Ionicons
            name="logo-github"
            size={24}
            color="white"
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.navigate("/")}>
          <Ionicons
            name="person-circle-outline"
            size={24}
            color="white"
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000000",
  },

  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 3,
  },

  fontContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
