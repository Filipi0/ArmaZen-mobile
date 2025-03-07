import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { fetchProducts, updateProductQuantity } from "../services/productService";

export default function MovimentarProdutoScreen() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [modifiedProducts, setModifiedProducts] = useState({}); // 🔥 Armazena mudanças temporárias
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
      setModifiedProducts({});
    } catch (error) {
      Alert.alert("Erro", error.message || "Falha ao buscar produtos");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeQuantity = (id, action) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === id) {
          const newQuantity = action === "increment" ? product.quantity + 1 : Math.max(0, product.quantity - 1);

          return { ...product, quantity: newQuantity };
        }
        return product;
      })
    );

    setModifiedProducts((prev) => ({
      ...prev,
      [id]: action === "increment" ? (prev[id] || 0) + 1 : (prev[id] || 0) - 1,
    }));
  };

  const handleSaveChanges = async () => {
    const updates = Object.keys(modifiedProducts);

    if (updates.length === 0) {
      Alert.alert("Nenhuma alteração", "Não há mudanças para salvar.");
      return;
    }

    try {
      for (const id of updates) {
        const action = modifiedProducts[id] > 0 ? "increment" : "decrement";
        await updateProductQuantity(id, action, Math.abs(modifiedProducts[id]));
      }

      Alert.alert("Sucesso", "Alterações salvas com sucesso!");
      loadProducts(); // Recarrega os produtos após salvar
    } catch (error) {
      Alert.alert("Erro", error.message || "Falha ao salvar alterações");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movimentar Produto</Text>

      <TextInput
        style={styles.input}
        placeholder="Pesquisar produto..."
        value={search}
        onChangeText={setSearch}
      />

      {loading ? <Text>Carregando produtos...</Text> : null}

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productText}>
              {item.name} - {item.quantity} {item.unit}
            </Text>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.incrementButton} onPress={() => handleChangeQuantity(item.id, "increment")}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.decrementButton} onPress={() => handleChangeQuantity(item.id, "decrement")}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {Object.keys(modifiedProducts).length > 0 && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 8, borderColor: "#ccc" },
  productItem: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1, borderColor: "#ddd" },
  productText: { fontSize: 16 },
  buttonsContainer: { flexDirection: "row", alignItems: "center" },
  incrementButton: { backgroundColor: "#4caf50", padding: 10, borderRadius: 5, marginRight: 5 },
  decrementButton: { backgroundColor: "#f44336", padding: 10, borderRadius: 5 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  saveButton: { backgroundColor: "#008CBA", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 20 },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
