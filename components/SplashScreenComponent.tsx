import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

// Import the logo image
import logo from "@/assets/images/circlelogo.png"; // Adjust the path as necessary

const SplashScreenComponent = () => {
  const navigation = useNavigation();

  // Shared values for animations
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const scale = useSharedValue(0.5);
  const rotate = useSharedValue(0);

  useEffect(() => {
    // Start animations
    opacity.value = withTiming(1, { duration: 2000, easing: Easing.ease });
    translateY.value = withTiming(0, {
      duration: 2000,
      easing: Easing.out(Easing.cubic),
    });
    scale.value = withTiming(1, { duration: 2000, easing: Easing.ease });
    rotate.value = withTiming(360, { duration: 2000, easing: Easing.ease });

    // Navigate to the next screen after 6 seconds
    const timeout = setTimeout(() => {
      navigation.navigate("index"); // Replace Splash screen with Home
    }, 6000);

    return () => clearTimeout(timeout); // Cleanup timeout if component unmounts
  }, [navigation]);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <View style={styles.container}>
      {/* Animated Logo */}
      <Animated.Image
        source={logo}
        style={[styles.logo, animatedStyle]}
      />
      {/* Animated Text with Emojis */}
      <Animated.View style={[animatedStyle, styles.textContainer]}>
        <Text style={styles.text}>Welcome to 2024 CENSUS</Text>
      </Animated.View>
    </View>
  );
};

// Styling for splash screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#083344", // Modern splash background color
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150, // Adjust width as needed
    height: 150, // Adjust height as needed
    marginBottom:-10, // Space between logo and text
  },
  textContainer: {
    marginTop: 20,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff", // White text for contrast
    textAlign: "center",
    marginTop: 10,
  },
});

export default SplashScreenComponent;
