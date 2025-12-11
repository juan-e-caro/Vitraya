import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("client");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://TU_API.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorText = data.errors
          ? Object.values(data.errors).join(" ")
          : data.message || "Error al registrarse";

        setErrorMessage(errorText);
        return;
      }

      await AsyncStorage.setItem("token", data.access_token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      navigation.navigate("Home");

    } catch (error) {
      console.error(error);
      setErrorMessage("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Crear Cuenta</Text>

        {errorMessage ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}

        {/* Nombre */}
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Confirmar contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {/* Selector de rol */}
        <View>
          <Text style={styles.label}>Rol</Text>

          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === "client" && styles.roleSelected,
              ]}
              onPress={() => setRole("client")}
            >
              <Text
                style={[
                  styles.roleText,
                  role === "client" && styles.roleTextSelected,
                ]}
              >
                Cliente
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                role === "vendor" && styles.roleSelected,
              ]}
              onPress={() => setRole("vendor")}
            >
              <Text
                style={[
                  styles.roleText,
                  role === "vendor" && styles.roleTextSelected,
                ]}
              >
                Vendedor
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botón */}
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.registerBtnText}>Registrarse</Text>
          )}
        </TouchableOpacity>

        {/* Link a Login */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
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
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  label: {
    fontWeight: "600",
    marginBottom: 5,
  },
  roleContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  roleButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    alignItems: "center",
    marginRight: 8,
  },
  roleSelected: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  roleText: {
    color: "#333",
    fontWeight: "500",
  },
  roleTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  registerBtn: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  registerBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    textAlign: "center",
    color: "#007bff",
    marginTop: 10,
  },
});
