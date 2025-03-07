import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { fetchProducts, deleteProduct } from "../services/productService"; // 🔥 Importando do novo service

export default function ListaProdutosScreen({}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

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
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleDelete(item.id)}>
            <Text style={styles.text}>{item.name} - {item.quantity} {item.unit}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: { padding: 15, borderBottomWidth: 1, borderColor: "#ccc" },
  text: { fontSize: 18 },
});
