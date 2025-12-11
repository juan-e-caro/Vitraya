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

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("https://TU_API.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, remember }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Credenciales incorrectas");
        return;
      }

      // Guardar token
      await AsyncStorage.setItem("token", data.access_token);

      // Guardar usuario
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      // Redirigir
      navigation.navigate("Home");

    } catch (error) {
      console.error(error);
      setErrorMessage("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        {errorMessage ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}

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

        {/* Password */}
        <View style={styles.passwordWrapper}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Contraseña"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.showBtn}
          >
            <Text style={{ color: "#555" }}>
              {showPassword ? "Ocultar" : "Ver"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recordarme */}
        <TouchableOpacity
          onPress={() => setRemember(!remember)}
          style={styles.checkboxRow}
        >
          <View style={[styles.checkbox, remember && styles.checkboxChecked]} />
          <Text style={styles.checkboxLabel}>Recordarme</Text>
        </TouchableOpacity>

        {/* Botón */}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginBtnText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>

        {/* Links */}
        <TouchableOpacity onPress={() => Alert.alert("Proximamente")}>
          <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.smallLink}>
            ¿No tienes cuenta? Regístrate aquí
          </Text>
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
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
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
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  showBtn: {
    paddingHorizontal: 10,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#555",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "#007bff",
  },
  checkboxLabel: {
    fontSize: 16,
  },
  loginBtn: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    textAlign: "center",
    color: "#007bff",
    marginTop: 10,
  },
  smallLink: {
    textAlign: "center",
    color: "#007bff",
    marginTop: 5,
    fontSize: 12,
  },
});
