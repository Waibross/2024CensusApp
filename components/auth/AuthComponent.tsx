import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";

const AuthComponent = () => {
  // State for the account creation form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Animation state
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Start the fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Function to handle account creation
  const handleSignUp = () => {
    // Add your sign-up logic here
    console.log("Creating account:", { email, password, confirmPassword });
  };

  return (
    <View style={styles.container}>
      {/* Logo and Title */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image
          source={require('@/assets/images/pngemblem.png')} // Replace with your logo path
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.titleText}>Papua New Guinea National Statistical Office</Text>
      </Animated.View>

      {/* Title */}
      <Text style={styles.headerText}>Create a New Account</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        placeholderTextColor="#888"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Action Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

// Modern styling for the form
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#082f49", // Dark blue background for a clean look
    borderRadius: 20,
    width: "100%",
  },
  logo: {
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
    marginBottom: -6,
    paddingHorizontal:170
  },
  titleText: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#fff", // White text for contrast
    textAlign: "center",
    marginBottom: 50, // Space between title and form
    paddingVertical:10,
    paddingHorizontal:80
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // White text for contrast
    marginBottom: 40, // Space between header and form
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff", // White background for inputs
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Elevation for Android shadow
  },
  button: {
    backgroundColor: "#ea580c", // Orange for action button
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default AuthComponent;
