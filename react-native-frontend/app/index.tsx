import { Text, View, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartBtn from "../componnets/buttons/StartBtn";
import LandingPageLayout from "../componnets/layouts/LandingPageLayout";
import FeatureCard from "../componnets/LandingPageComponnets.tsx/FeatureCard";

export default function Index() {
  return (
    <ScrollView style={styles.container}>
      <LandingPageLayout>
        <View>
          <View style={styles.firstConainer}>
            <Text style={styles.firstContainerText}>Build Better Habits</Text>
            <Text style={styles.firstContainerText2}>
              Create lasting habits, track your progress, set reminder and
              achieve your goals {"\n"} with HabitAura.
            </Text>

            {/* Button section */}
            <View style={styles.StartBtnSection}>
              <StartBtn />
            </View>
          </View>

          {/* feature section */}
          <View style={styles.featureContainer}>
            <Text style={styles.featureHeading}>
              Transform Your Life With Better Habits
            </Text>
            <Text style={styles.featureSubheading}>
              Our science-backed approach helps you build lasting habits and
              break bad ones.
            </Text>

            {/* feature cards */}
            <View style={styles.FeatureCardSection}>
              <FeatureCard />
              <FeatureCard />
              <FeatureCard />
              <FeatureCard />
            </View>
          </View>
        </View>
      </LandingPageLayout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  firstConainer: {
    padding: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#034C7B",
  },

  firstContainerText: {
    fontSize: 75,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 30,
  },

  firstContainerText2: {
    fontSize: 26,
    color: "#FFFFFF",
    fontWeight: "400",
    marginBottom: 30,
    alignItems: "center",
    textAlign: "center",
    lineHeight: 35,
  },

  StartBtnSection: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  featureContainer: {
    padding: 60,
  },

  featureHeading: {
    fontSize: 37,
    fontWeight: "700",
    marginBottom: 20,
    justifyContent: "center",
    textAlign: "center",
  },

  featureSubheading: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 10,
    justifyContent: "center",
    textAlign: "center",
  },

  FeatureCardSection: {
    marginTop: 30,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
