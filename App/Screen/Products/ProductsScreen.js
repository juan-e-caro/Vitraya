import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductCard from "../../components/products/ProductCard"; // versión RN

export default function ProductsScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar token
  const loadProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch("http://localhost:8000/api/ListProduct", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) throw new Error("Error al cargar productos");

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
      setError("No se pudieron cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddToCart = (id) => {
    Alert.alert("Carrito", `Producto ${id} agregado al carrito`);
    // Aquí después conectas tu API real
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 10 }}>Cargando productos...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos los Productos</Text>

      <FlatList
        data={products}
        numColumns={2}  // ← grid tipo 2 columnas
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <ProductCard
            {...item}
            onAddToCart={() => handleAddToCart(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No hay productos disponibles.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});