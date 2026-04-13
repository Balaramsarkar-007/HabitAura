import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Auth() {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});

  const { width } = useWindowDimensions();
  const isMobile = width < 600;
  const router = useRouter();

  const validate = () => {
    const newErrors: typeof errors = {};
    if (authMode === "signup" && !username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuthModeChange = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setUsername("");
    setEmail("");
    setPassword("");
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // TODO: integrate with auth API
      console.log({ authMode, username, email, password });
    } catch (error) {
      console.log("Auth error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.container, { paddingHorizontal: isMobile ? 20 : 40 }]}>
          {/* Logo & Title */}
          <View style={styles.headerSection}>
            <Image
              source={require("../../assets/images/logo2.png")}
              style={[styles.logo, { width: isMobile ? 60 : 80, height: isMobile ? 60 : 80 }]}
              resizeMode="contain"
            />
            <Text style={[styles.title, { fontSize: isMobile ? 24 : 30 }]}>HabitAura</Text>
            <Text style={[styles.subtitle, { fontSize: isMobile ? 14 : 16 }]}>
              {authMode === "login"
                ? "Welcome back! Sign in to continue your journey."
                : "Start building better habits today."}
            </Text>
          </View>

          {/* Auth Card */}
          <View style={[styles.card, { maxWidth: isMobile ? "100%" : 440, padding: isMobile ? 20 : 28 }]}>
            {/* Toggle Tabs */}
            <View style={styles.tabRow}>
              <TouchableOpacity
                style={[styles.tab, authMode === "login" && styles.tabActive]}
                onPress={() => handleAuthModeChange("login")}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, authMode === "login" && styles.tabTextActive]}>
                  Sign In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, authMode === "signup" && styles.tabActive]}
                onPress={() => handleAuthModeChange("signup")}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, authMode === "signup" && styles.tabTextActive]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            {/* Username (sign up only) */}
            {authMode === "signup" && (
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>
                  Username <Text style={styles.required}>*</Text>
                </Text>
                <View style={[styles.inputWrapper, errors.username ? styles.inputError : null]}>
                  <TextInput
                    style={styles.input}
                    placeholder="xyz"
                    placeholderTextColor="#9CA3AF"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                  />
                </View>
                {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
              </View>
            )}

            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                Email <Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.inputWrapper, errors.email ? styles.inputError : null]}>
                <TextInput
                  style={styles.input}
                  placeholder="example@gmail.com"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
                <Ionicons name="mail" size={20} color="#10B981" style={styles.inputIcon} />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                Password <Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.inputWrapper, errors.password ? styles.inputError : null]}>
                <TextInput
                  style={styles.input}
                  placeholder="8#3kZ!qW5fP7&"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            {/* Submit Button */}
            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={handleSubmit}
                activeOpacity={0.85}
                disabled={loading}
                style={styles.btnTouchable}
              >
                <LinearGradient
                  colors={["#3B82F6", "#8B5CF6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientBtn}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <View style={styles.btnContent}>
                      <Text style={styles.btnText}>
                        {authMode === "login" ? "Sign In" : "Create Account"}
                      </Text>
                      <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    paddingVertical: 40,
  },

  /* Header */
  headerSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  logo: {
    marginBottom: 12,
  },
  title: {
    fontWeight: "700",
    color: "#1E3A5F",
    marginBottom: 6,
  },
  subtitle: {
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },

  /* Card */
  card: {
    width: "100%",
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },

  /* Tabs */
  tabRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#DBEAFE",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B7280",
  },
  tabTextActive: {
    color: "#1E40AF",
  },

  /* Form Fields */
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  required: {
    color: "#EF4444",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  inputError: {
    borderColor: "#EF4444",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111827",
  },
  inputIcon: {
    marginLeft: 8,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },

  /* Button */
  btnContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  btnTouchable: {
    width: "100%",
  },
  gradientBtn: {
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  btnContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
});
