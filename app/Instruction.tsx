import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from "@/assets/images/pngemblem.png"; // Adjust the path as necessary

export default function InstructionPage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.censusText}>Papua New Guinea</Text>
      <Text style={styles.censusTex}>National Statistical Office</Text>

      <Text style={styles.headerText}>Welcome to 2024 CENSUS REGISTRATION</Text>
      <Text style={styles.sheaderText}>Please follow the instruction to proceed with the registration:</Text>
      <ScrollView style={styles.instructionsContainer}>
        <Text style={styles.instructionItem}>
          1. Gather all necessary documents and information for each household member.
        </Text>
        <Text style={styles.instructionItem}>
          2. Ensure you understand the questions being asked before responding.
        </Text>
        <Text style={styles.instructionItem}>
          3. Provide accurate information to the best of your ability.
        </Text>
        <Text style={styles.instructionItem}>
          4. Do not skip any questions; ensure all fields are completed.
        </Text>
        <Text style={styles.instructionItem}>
          5. Review your answers before submitting the form.
        </Text>
        <Text style={styles.instructionItem}>
          6. If you have any questions, contact the census help line for assistance.
        </Text>
        <Text style={styles.instructionItem}>
          7. Keep your census receipt for future reference.
        </Text>
        <Text style={styles.instructionItem}>
          8. Remember that your information is confidential and will be used for statistical purposes only.
        </Text>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#218484',
    justifyContent: 'space-between',
  },
  logo: {
    width: 60,
    height: 40,
    position: 'absolute',
    top: 40,
    right: 29,
  },
  censusText: {
    position: 'absolute',
    top: 80,
    right: 30,
    fontSize: 10,
    fontWeight: 'normal',
    color: '#EBEBEBEB',
    textAlign: 'center',
  },
  censusTex: {
    position: 'absolute',
    top: 90,
    right: 20,
    fontSize: 10,
    fontWeight: 'normal',
    color: '#EBEBEBEB',
    textAlign: 'center',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#EBEBEBEB',
    marginBottom: 20,
    textAlign: 'center',
    paddingTop: 80,
  },
  sheaderText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#EBEBEBEB',
    marginBottom: 10,
    textAlign: 'center',
    paddingTop: 1,
  },
  instructionsContainer: {
    backgroundColor: '#091A38',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius:10,
    elevation: 5,
  },
  instructionItem: {
    fontSize: 16,
    color: '#EBEBEBEB',
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 30,
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    bottom:-19,
    left:90,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
