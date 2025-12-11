import React, { useEffect, useState } from "react";
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

export default function EditProfileScreen() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = (await AsyncStorage.getItem("token")) || "";
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:8000/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data.user);
        setFormData({ name: data.user.name, email: data.user.email });
      } catch (err) {
        setError("No se pudo cargar la información");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleUpdate = async () => {
    if (!user) return;
    setError("");
    setSuccess("");

    const token = (await AsyncStorage.getItem("token")) || "";

    try {
      const res = await fetch(
        `http://localhost:8000/api/UpdateUser/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al actualizar los datos");
        return;
      }

      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ ...user, ...formData })
      );
      setSuccess("Datos actualizados correctamente");

      Alert.alert("Éxito", "Datos actualizados correctamente", [
        { text: "OK", onPress: () => navigation.navigate("Profile") },
      ]);
    } catch (err) {
      setError("Error de conexión");
    }
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );

  if (!user)
    return (
      <View style={styles.center}>
        <Text>No hay información del usuario.</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => handleChange("name", text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleUpdate}
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f7f7f7" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  error: { color: "#dc3545", marginBottom: 10, textAlign: "center" },
  success: { color: "#28a745", marginBottom: 10, textAlign: "center" },
  inputGroup: { marginBottom: 15 },
  label: { fontWeight: "bold", marginBottom: 5 },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  button: { flex: 1, padding: 12, borderRadius: 8, alignItems: "center" },
  saveButton: { backgroundColor: "#28a745", marginRight: 10 },
  cancelButton: { backgroundColor: "#6c757d", marginLeft: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
