import React, { useEffect, useRef } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Import the logo image
import logo from "@/assets/images/pngemblem.png"; // Adjust the path as necessary

const WelcomePage = () => {
  const navigation = useNavigation();
  
  // Animated values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  const handleRegister = () => {
    navigation.navigate("Login"); // Change to the correct route name if needed
  };

  useEffect(() => {
    // Fade-in effect for the logo and text
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    // Bounce effect for the button
    const bounce = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    bounce.start();

    return () => bounce.stop(); // Cleanup on unmount
  }, [fadeAnim, bounceAnim]);

  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Animated.Image
        source={logo}
        style={[styles.logo, { opacity: fadeAnim }]}
      />

      {/* Name under the logo */}
      <Animated.Text style={[styles.imagename, { opacity: fadeAnim }]}>
        Papua New Guinea National Statistical Office
      </Animated.Text>
      <Animated.Text style={[styles.nameText, { opacity: fadeAnim }]}>
        Welcome to 2024 CENSUS
      </Animated.Text>

      {/* Register Button */}
      <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register Here</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#091A38", // Dark background color
  },
  logo: {
    width: 200, // Adjust width as needed
    height: 140, // Adjust height as needed
    marginBottom: 20, // Space between logo and name
  },
  nameText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff", // White color for text
    marginBottom: 240, // Adjust space between name and button
    textAlign: "center",
    paddingHorizontal: 56,
  },
  button: {
    backgroundColor: "#ea580c", // Orange color for the button
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Elevation for Android
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  imagename: {
    color: "#fff",
    paddingHorizontal: 130,
    textAlign: "center",
  },
});

export default WelcomePage;
