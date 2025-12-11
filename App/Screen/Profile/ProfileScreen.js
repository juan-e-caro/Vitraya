import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfile = async () => {
      const token =
        (await AsyncStorage.getItem("token")) || "";

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
      } catch (err) {
        setError("No se pudo cargar la información");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleDelete = async () => {
    if (!user) return;

    Alert.alert(
      "Eliminar Cuenta",
      "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const token =
              (await AsyncStorage.getItem("token")) || "";
            try {
              const res = await fetch(
                `http://localhost:8000/api/DeleteUser/${user.id}`,
                {
                  method: "DELETE",
                  headers: { Authorization: `Bearer ${token}` },
                }
              );

              if (!res.ok) {
                setError("No se pudo eliminar la cuenta");
                return;
              }

              await AsyncStorage.removeItem("user");
              await AsyncStorage.removeItem("token");
              navigation.navigate("Home");
            } catch (err) {
              setError("Error de conexión");
            }
          },
        },
      ]
    );
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

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const roleColors = {
    Admin: "#dc3545",
    Vendor: "#ffc107",
    Client: "#0d6efd",
  };

  const roleColor = roleColors[user.role] || "#6c757d";

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      <Text style={styles.name}>{user.name}</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.infoBox}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{user.name}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Rol:</Text>
        <Text style={[styles.role, { backgroundColor: roleColor }]}>
          {user.role}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: "#f7f7f7" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#6c757d",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarText: { fontSize: 32, color: "#fff", fontWeight: "bold" },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  error: { color: "#dc3545", marginBottom: 10 },
  infoBox: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  label: { fontWeight: "bold" },
  value: {},
  role: {
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: "bold",
    overflow: "hidden",
  },
  actions: { flexDirection: "row", width: "100%", justifyContent: "space-between", marginTop: 20 },
  button: { flex: 1, padding: 12, borderRadius: 8, alignItems: "center" },
  editButton: { backgroundColor: "#0d6efd", marginRight: 10 },
  deleteButton: { backgroundColor: "#dc3545", marginLeft: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
