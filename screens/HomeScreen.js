import React from "react";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import FitnessLogo from '../images/path_to_your_fitness_logo.jpeg';

export default function HomeScreen({ navigation, route }) {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Image source={FitnessLogo} style={styles.logo} />

        <Text style={styles.text}>Welcome to FitnessApp</Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddDay")}
        >
          <Text style={styles.buttonText}>Start your Fitness Journey</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#025d93",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white", 
  },
  button: {
    backgroundColor: "#e3526e",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
