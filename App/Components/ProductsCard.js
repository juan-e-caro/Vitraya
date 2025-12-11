import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function ProductCard({
  id,
  name,
  description,
  price,
  stock,
  image_url,
  onAddToCart,
}) {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri:
            image_url ||
            "https://via.placeholder.com/300x200?text=Sin+imagen",
        }}
        style={styles.image}
      />

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {name}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        <Text style={styles.price}>${price.toLocaleString()}</Text>

        <Text style={styles.stock}>
          Stock:{" "}
          <Text style={{ fontWeight: "600" }}>
            {stock}
          </Text>
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            stock === 0 && styles.buttonDisabled,
          ]}
          disabled={stock === 0}
          onPress={() => onAddToCart?.(id)}
        >
          <Text style={styles.buttonText}>
            {stock === 0 ? "Agotado" : "Agregar al carrito"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4, // sombra Android
    shadowColor: "#000", // sombra iOS
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  body: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#555",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: "#0d6efd",
    fontWeight: "bold",
    marginBottom: 4,
  },
  stock: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#9e9e9e",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
