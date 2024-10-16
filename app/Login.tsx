import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";

// Import the logo image
import logo from "@/assets/images/pngemblem.png"; // Adjust the path as necessary

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function HomeScreen() {
  const navigation = useNavigation();

  // State for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Animation states
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    // Start the fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Start button scaling animation
    const scaleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 500,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
      ])
    );

    scaleAnimation.start();

    return () => scaleAnimation.stop(); // Cleanup on unmount
  }, [fadeAnim, scaleAnim]);

  const handleLogin = () => {
    // Check for hardcoded username and password
    if (username.trim() === "POPPY" && password === "1234567") {
      navigation.navigate("Instruction"); // Navigate to instruction page
    } else {
      alert("Invalid username or password");
    }
  };

  const handleSignIn = () => {
    navigation.navigate("Authention");
  };

  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Animated.Image
        source={logo}
        style={[styles.logo, { opacity: fadeAnim }]}
      />

      {/* Header Text */}
      <Animated.Text style={[styles.imagename, { opacity: fadeAnim }]}>
        Papua New Guinea National Statistical Office
      </Animated.Text>
      <Animated.Text style={[styles.headerText, { opacity: fadeAnim }]}>
        Welcome to 2024 CENSUS
      </Animated.Text>
      <Animated.Text style={[styles.subText, { opacity: fadeAnim }]}>
        Explore and manage your content with ease.
      </Animated.Text>

      {/* Username Input */}
      <AnimatedTextInput
        style={[styles.input, { opacity: fadeAnim }]}
        placeholder="Username"
        placeholderTextColor="#ddd" // Placeholder color
        value={username}
        onChangeText={setUsername}
      />

      {/* Password Input */}
      <AnimatedTextInput
        style={[styles.input, { opacity: fadeAnim }]}
        placeholder="Password"
        placeholderTextColor="#ddd" // Placeholder color
        secureTextEntry={true} // Hides the password text
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={handleLogin} // Call the login handler
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Sign Up Button */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={handleSignIn}
        >
          <Text style={styles.buttonText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// Styling for a modern, attractive layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#091A38", // Dark background for contrast against buttons
  },
  logo: {
    width: 200, // Adjust width as needed
    height: 140, // Adjust height as needed
    marginBottom: 20, // Space between logo and header text
  },
  headerText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff", // Changed to white for contrast against dark background
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "#ddd", // Light gray for better contrast
    textAlign: "center",
    marginBottom: 20, // Adjust space between text and input fields
  },
  input: {
    height: 50,
    width: "80%", // Width of the input fields
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20, // Space between input fields and buttons
    color: "#fff", // Text color
  },
  buttonSecondary: {
    backgroundColor: "#ea580c", // Stylish orange for Sign In/Sign Up buttons
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 20,
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
    paddingHorizontal: 110,
    textAlign: "center",
    marginBottom: 10,
  },
});
