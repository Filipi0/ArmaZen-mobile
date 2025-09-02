import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import {
  fetchProducts,
  updateProductQuantity,
} from "../services/productService";

export default function MovimentarProdutoScreen() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [modifiedProducts, setModifiedProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [incrementInterval, setIncrementInterval] = useState(null); // 🔥 Para armazenar o loop

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
          const newQuantity =
            action === "increment"
              ? product.quantity + 1
              : Math.max(0, product.quantity - 1);
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

  // 🔥 Função para iniciar o incremento/decremento contínuo
  const startChange = (id, action) => {
    handleChangeQuantity(id, action); // Executa a primeira vez imediatamente
    const interval = setInterval(() => {
      handleChangeQuantity(id, action);
    }, 200); // Atualiza a cada 200ms
    setIncrementInterval(interval);
  };

  // 🔥 Função para parar o incremento/decremento contínuo
  const stopChange = () => {
    if (incrementInterval) {
      clearInterval(incrementInterval);
      setIncrementInterval(null);
    }
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
      loadProducts();
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
        placeholderTextColor="#dce0e6"
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <Text style={styles.loadingText}>Carregando produtos...</Text>
      ) : null}

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDetails}>
              {item.quantity} {item.unit} | {item.supplier}
            </Text>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.incrementButton}
                onPressIn={() => startChange(item.id, "increment")} // 🔥 Inicia ao pressionar
                onPressOut={stopChange} // 🔥 Para ao soltar
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.decrementButton}
                onPressIn={() => startChange(item.id, "decrement")} // 🔥 Inicia ao pressionar
                onPressOut={stopChange} // 🔥 Para ao soltar
              >
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

// 🔥 **Estilização baseada na paleta de cores**
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#1f1f20" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#dce0e6",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#606d80",
    color: "#dce0e6",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    width: "100%",
    fontSize: 16,
  },
  loadingText: {
    color: "#dce0e6",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
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
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 10,
  },
  incrementButton: {
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
    width: 50,
    alignItems: "center",
  },
  decrementButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    width: 50,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  saveButton: {
    backgroundColor: "#567ebb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
