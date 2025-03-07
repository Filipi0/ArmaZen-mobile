import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { fetchProducts, deleteProduct } from "../services/productService";

export default function ListaProdutosScreen() {
  const [products, setProducts] = useState([]);

  // 🔥 Atualiza os produtos sempre que a tela for focada
  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      Alert.alert("Erro", error.message || "Falha ao buscar produtos");
    }
  };

  const handleDelete = async (id) => {
    Alert.alert("Confirmação", "Deseja excluir este produto?", [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: async () => {
          try {
            await deleteProduct(id);
            Alert.alert("Sucesso", "Produto deletado!");
            loadProducts(); // Atualiza lista após excluir
          } catch (error) {
            Alert.alert("Erro", error.message || "Falha ao excluir produto");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Produtos</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDetails}>
              {item.quantity} {item.unit} | {item.supplier}
            </Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

// **Estilização baseada na paleta de cores**
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#1f1f20" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#dce0e6",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 20,
  },
  productCard: {
    backgroundColor: "#2b4c7e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  productName: { fontSize: 18, fontWeight: "bold", color: "#dce0e6" },
  productDetails: { fontSize: 14, color: "#dce0e6", marginBottom: 10 },
  deleteButton: {
    backgroundColor: "#dce0e6",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    width: "30%",
    alignSelf: "flex-end",
  },
  deleteButtonText: { color: "#606d80", fontWeight: "bold" },
});
