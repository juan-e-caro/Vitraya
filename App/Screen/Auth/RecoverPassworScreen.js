import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RecoverPasswordScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async () => {
    if (!email.includes("@")) {
      setIsError(true);
      setMessage("Ingresa un correo válido");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://TU_API.com/api/password/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setMessage(data.message || "No se pudo enviar el correo");
      } else {
        setIsError(false);
        setMessage("Se ha enviado un enlace de recuperación a tu correo");
      }

    } catch (error) {
      setIsError(true);
      setMessage("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.title}>Recuperar Contraseña</Text>

        {message ? (
          <Text style={[styles.message, isError ? styles.error : styles.success]}>
            {message}
          </Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Enviar enlace de recuperación</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Volver al inicio de sesión</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  link: {
    textAlign: "center",
    color: "#007bff",
    marginTop: 10,
  },
  message: {
    textAlign: "center",
    marginBottom: 12,
    fontSize: 14,
  },
  error: {
    color: "red",
  },
  success: {
    color: "green",
  },
});
