import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* HERO */}
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
        }}
        style={styles.hero}
        resizeMode="cover"
      >
        <Text style={styles.title}>Encuentra lo Mejor para tu Hogar</Text>

        <Text style={styles.subtitle}>
          Calidad garantizada y las mejores ofertas para ti.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  hero: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#eee",
    textAlign: "center",
    marginBottom: 30,
    width: "80%",
  },

  button: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 10,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
