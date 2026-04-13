import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FeatureCardProps {
  title: string;
  description: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

export default function FeatureCard({feature}: {feature: FeatureCardProps}) {
  console.log("FeatureCard props:", feature );
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name={feature.iconName} size={28} color="#0D9488" />
      </View>
      <Text style={styles.title}>{feature.title}</Text>
      <Text style={styles.description}>
        {feature.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 200,
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E0F7F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
});
