import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface StepCardProps {
  number: number;
  heading: string;
  description: string;
}

export default function StepCard({ step }: { step: StepCardProps }) {
  return (
    <View style={styles.container}>
      <View style={styles.numberCircle}>
        <Text style={styles.numberText}>{step.number}</Text>
      </View>
      <Text style={styles.heading}>{step.heading}</Text>
      <Text style={styles.description}>{step.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 200,
    // maxWidth: 350,
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  numberCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#0D7377",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  numberText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
  },
});
