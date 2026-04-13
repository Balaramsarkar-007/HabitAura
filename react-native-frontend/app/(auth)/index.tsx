import { Text, View, StyleSheet, ScrollView, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartBtn from "../../componnets/buttons/StartBtn";
import LandingPageLayout from "../../componnets/layouts/LandingPageLayout";
import FeatureCard from "../../componnets/LandingPageComponnets.tsx/FeatureCard";
import StepCard from "../../componnets/LandingPageComponnets.tsx/StepCard";
import ReviewCard from "../../componnets/LandingPageComponnets.tsx/ReviewCard";

export default function Index() {
  const { width } = useWindowDimensions();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;
  const features = [
    {
      title: "Track Your Progress",
      description: "Create and track habits with customizable frequencies and reminders.",
      iconName: "checkmark-circle" as const,
    },
    {
      title: "Visualize Progress",
      description: "Visualize your habit journey with insightful graphs and statistics.",
      iconName: "bar-chart" as const,
    },
    {
      title: "Set Reminders",
      description: "Get timely reminders to keep you on track with your habits.",
      iconName: "notifications" as const,
    },
    {
      title: "Earn Achievements",
      description: "Stay motivated with rewards, streaks, and milestones for your achievements.",
      iconName: "trophy" as const,
    },
  ];

  const reviews = [
    {
      userName: "Himangshu Mishra",
      initials: "HM",
      review: "habitAura has completely changed how I approach my fitness goals. I've been able to maintain a consistent workout routine for over 6 months now!",
      initialsBackground: "#D1FAE5",
    },
    {
      userName: "Alok Mishra",
      initials: "AM",
      review: "As someone who struggles with consistency, this app has been a game-changer. The streak feature keeps me motivated to maintain my coding practice.",
      initialsBackground: "#DBEAFE",
    },
    {
      userName: "Amiya Ranjan Behera",
      initials: "ARB",
      review: "The visual progress charts help me see how far I've come with my study habits. I'm more productive and organized than ever before.",
      initialsBackground: "#FEF3C7",
    },
  ];

  const steps = [
    {
      number: 1,
      heading: "Create Your Habits",
      description: "Define the habits you want to build, and set your frequency and schedule.",
    },
    {
      number: 2,
      heading: "Track Your Progress",
      description: "Check off completed habits and monitor your streaks and consistency.",
    },
    {
      number: 3,
      heading: "Achieve Your Goals",
      description: "Transform your life through consistent action and habit building.",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <LandingPageLayout>
        <View>
          <View style={[styles.firstConainer, { padding: isMobile ? 24 : isTablet ? 40 : 60 }]}>
            <Text style={[styles.firstContainerText, { fontSize: isMobile ? 32 : isTablet ? 50 : 75 }]}>Build Better Habits</Text>
            <Text style={[styles.firstContainerText2, { fontSize: isMobile ? 16 : isTablet ? 20 : 26 }]}>
              Create lasting habits, track your progress, set reminder and
              achieve your goals {"\n"} with HabitAura.
            </Text>

            {/* Button section */}
            <View style={styles.StartBtnSection}>
              <StartBtn />
            </View>
          </View>

          {/* feature section */}
          <View style={[styles.featureContainer, { padding: isMobile ? 24 : 60 }]}>
            <Text style={[styles.featureHeading, { fontSize: isMobile ? 24 : isTablet ? 30 : 37 }]}>
              Transform Your Life With Better Habits
            </Text>
            <Text style={[styles.featureSubheading, { fontSize: isMobile ? 15 : 20 }]}>
              Our science-backed approach helps you build lasting habits and
              break bad ones.
            </Text>

            {/* feature cards */}
            <View style={[styles.FeatureCardSection, isMobile && { flexDirection: "column", alignItems: "center" }]}>
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  feature = {{
                    title: feature.title,
                    description: feature.description,
                    iconName: feature.iconName,
                  }}
                />
              ))}
            </View>
          </View>

          {/* How it works section */}
          <View style={[styles.howItWorksContainer, { padding: isMobile ? 24 : 20 }]}>
            <View style={styles.howItWorksHeader}>
              <Text style={[styles.featureHeading, { fontSize: isMobile ? 24 : isTablet ? 30 : 37 }]}>How it works</Text>
              <Text style={[styles.featureSubheading, { fontSize: isMobile ? 15 : 20 }]}>
                Simple steps to transform your habits and achieve your goals.
              </Text>
            </View>

            <View style={[styles.stepsSection, isMobile && { flexDirection: "column", alignItems: "center" }]}>
              {steps.map((step, index) => (
                <StepCard key={index} step={step} />
              ))}
            </View>

             {/* Button section */}
            <View style={styles.StartBtnSection}>
              <StartBtn />
            </View>
          </View>

          {/* user reviews section */}
          <View style={[styles.reviewsContainer, { padding: isMobile ? 24 : 60 }]}>
            <Text style={[styles.featureHeading, { fontSize: isMobile ? 24 : isTablet ? 30 : 37 }]}>What Our Users Say</Text>
            <Text style={[styles.featureSubheading, { fontSize: isMobile ? 15 : 20 }]}>
              Join thousands of people who have transformed their lives with HabitAura.
            </Text>
            <View style={[styles.reviewsSection, isMobile && { flexDirection: "column", alignItems: "center" }]}>
              {reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </View>
          </View>

          {/* CTA bottom section */}
          <View style={[styles.ctaContainer, { paddingVertical: isMobile ? 40 : 80, paddingHorizontal: isMobile ? 20 : 40 }]}>
            <Text style={[styles.ctaHeading, { fontSize: isMobile ? 24 : isTablet ? 30 : 37 }]}>
              Ready to Transform Your Habits?
            </Text>
            <Text style={[styles.ctaSubtext, { fontSize: isMobile ? 14 : 18 }]}>
              Join thousands of users who are building better habits and achieving their goals with HabitAura.
            </Text>
            <View style={styles.ctaBtnSection}>
              <StartBtn />
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
    marginVertical: 20,
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "stretch",
  },

  howItWorksContainer: {
    padding: 20,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },

  howItWorksHeader: {
    marginBottom: 20,
    alignItems: "center",
  },

  stepsSection: {
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },

  reviewsContainer: {
    padding: 60,
    backgroundColor: "#F9FAFB",
  },

  reviewsSection: {
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 24,
  },

  ctaContainer: {
    paddingVertical: 80,
    paddingHorizontal: 40,
    backgroundColor: "#0F4C5C",
    alignItems: "center",
    justifyContent: "center",
  },

  ctaHeading: {
    fontSize: 37,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },

  ctaSubtext: {
    fontSize: 18,
    color: "#D1D5DB",
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 10,
    maxWidth: 600,
  },

  ctaBtnSection: {
    marginTop: 30,
  },
});
