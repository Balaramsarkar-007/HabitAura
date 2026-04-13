import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface ReviewCardProps {
  userName: string;
  initials: string;
  review: string;
  initialsBackground: string;
}

export default function ReviewCard({ review }: { review: ReviewCardProps }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: review.initialsBackground }]}>
          <Text style={styles.avatarText}>{review.initials}</Text>
        </View>
        <Text style={styles.userName}>{review.userName}</Text>
      </View>
      <Text style={styles.reviewText}>{review.review}</Text>
      <Text style={styles.stars}>★★★★★</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 250,
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
  },
  reviewText: {
    fontSize: 16,
    color: "#64748B",
    lineHeight: 24,
    flex: 1,
    marginBottom: 16,
  },
  stars: {
    fontSize: 20,
    color: "#F59E0B",
  },
});
