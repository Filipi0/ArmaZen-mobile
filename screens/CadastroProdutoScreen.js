import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import { createProduct } from "../services/productService";

export default function CadastroProdutoScreen({ navigation }) {
  const [itemType, setItemType] = useState("");
  const [supplier, setSupplier] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [expirationDate, setExpirationDate] = useState(""); // YYYY-MM-DD

  const handleRegister = async () => {
    if (!itemType || !supplier || !name || !quantity || !unit || !expirationDate) {
      Alert.alert("Erro", "Preencha todos os campos corretamente!");
      return;
    }

    try {
      const response = await createProduct({
        itemType,
        supplier,
        name,
        quantity: parseInt(quantity), // 🔥 Certifique-se de que é um número
        unit,
        expirationDate, // Formato "YYYY-MM-DD"
      });

      Alert.alert("Sucesso", response.message || "Produto cadastrado com sucesso!");
      setItemType("");
      setSupplier("");
      setName("");
      setQuantity("");
      setUnit("");
      setExpirationDate("");
    } catch (error) {
      Alert.alert("Erro", error.message || "Falha ao cadastrar produto");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Produto</Text>

      <TextInput placeholder="Tipo do Produto" value={itemType} onChangeText={setItemType} style={styles.input} />
      <TextInput placeholder="Fornecedor" value={supplier} onChangeText={setSupplier} style={styles.input} />
      <TextInput placeholder="Nome do Produto" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Quantidade" value={quantity} onChangeText={setQuantity} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Unidade (ex: unidade, kg, litro)" value={unit} onChangeText={setUnit} style={styles.input} />
      <TextInput placeholder="Data de Validade (YYYY-MM-DD)" value={expirationDate} onChangeText={setExpirationDate} style={styles.input} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar Produto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 12, marginBottom: 10, borderRadius: 8, borderColor: "#ccc" },
  button: { backgroundColor: "#4caf50", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
