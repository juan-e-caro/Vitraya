import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CartScreen() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserAndCart = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        await fetchCart(JSON.parse(storedUser).id);
      }
      setLoading(false);
    };
    loadUserAndCart();
  }, []);

  const fetchCart = async (userId) => {
    try {
      const res = await fetch(`http://localhost:8000/api/cart/${userId}`);
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.log("Error cargando carrito:", err);
    }
  };

  const handleQuantityChange = async (itemId, quantity) => {
    const q = Math.max(1, quantity);
    try {
      await fetch(`http://localhost:8000/api/cart/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: q }),
      });
      setCart((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, quantity: q } : item))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await fetch(`http://localhost:8000/api/cart/${itemId}`, { method: "DELETE" });
      setCart((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirmPurchase = () => {
    Alert.alert(
      "Confirmar Compra",
      "Una vez confirmada la compra, no podrás deshacer esta acción.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              await fetch(`http://localhost:8000/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: user.id, items: cart }),
              });
              await fetch(`http://localhost:8000/api/cart/clear/${user.id}`, {
                method: "DELETE",
              });
              setCart([]);
            } catch (err) {
              console.log(err);
            }
          },
        },
      ]
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );

  if (!user)
    return (
      <View style={styles.center}>
        <Text>Debes iniciar sesión para ver tu carrito.</Text>
      </View>
    );

  if (cart.length === 0)
    return (
      <View style={styles.center}>
        <Text>Tu carrito está vacío.</Text>
      </View>
    );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>

      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={String(item.quantity)}
        onChangeText={(text) => handleQuantityChange(item.id, parseInt(text) || 1)}
      />

      <Text style={styles.price}>${item.price.toLocaleString()}</Text>
      <Text style={styles.subtotal}>Subtotal: ${(item.price * item.quantity).toLocaleString()}</Text>

      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => handleRemoveItem(item.id)}
      >
        <Text style={styles.removeText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu Carrito</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${total.toLocaleString()}</Text>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmPurchase}>
          <Text style={styles.confirmText}>Proceder a la compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f7f7f7" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  name: { fontSize: 16, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    marginVertical: 5,
    width: 60,
    textAlign: "center",
    borderRadius: 6,
  },
  price: { fontSize: 14, color: "#0d6efd" },
  subtotal: { fontSize: 14, fontWeight: "600", marginVertical: 4 },
  removeBtn: { backgroundColor: "#dc3545", padding: 6, borderRadius: 6, alignItems: "center" },
  removeText: { color: "#fff", fontWeight: "bold" },
  footer: { marginTop: 10, alignItems: "center" },
  total: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  confirmBtn: { backgroundColor: "#28a745", padding: 12, borderRadius: 8 },
  confirmText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
