import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
} from "react-native";
import { createProduct } from "../services/productService";

export default function CadastroProdutoScreen({ navigation }) {
  const [itemType, setItemType] = useState("");
  const [supplier, setSupplier] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [expirationDate, setExpirationDate] = useState(""); // YYYY-MM-DD

  const handleRegister = async () => {
    if (
      !itemType ||
      !supplier ||
      !name ||
      !quantity ||
      !unit ||
      !expirationDate
    ) {
      Alert.alert("Erro", "Preencha todos os campos corretamente!");
      return;
    }

    try {
      const response = await createProduct({
        itemType,
        supplier,
        name,
        quantity: parseInt(quantity),
        unit,
        expirationDate,
      });

      Alert.alert(
        "Sucesso",
        response.message || "Produto cadastrado com sucesso!"
      );
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

      <TextInput
        placeholder="Tipo do Produto"
        placeholderTextColor="#dce0e6"
        value={itemType}
        onChangeText={setItemType}
        style={styles.input}
      />
      <TextInput
        placeholder="Fornecedor"
        placeholderTextColor="#dce0e6"
        value={supplier}
        onChangeText={setSupplier}
        style={styles.input}
      />
      <TextInput
        placeholder="Nome do Produto"
        placeholderTextColor="#dce0e6"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade"
        placeholderTextColor="#dce0e6"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Unidade (ex: unidade, kg, litro)"
        placeholderTextColor="#dce0e6"
        value={unit}
        onChangeText={setUnit}
        style={styles.input}
      />
      <TextInput
        placeholder="Data de Validade (YYYY-MM-DD)"
        placeholderTextColor="#dce0e6"
        value={expirationDate}
        onChangeText={setExpirationDate}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar Produto</Text>
      </TouchableOpacity>
    </View>
  );
}

// 🔥 **Estilização baseada na paleta de cores**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1f1f20",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#dce0e6",
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#606d80",
    color: "#dce0e6",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    width: "80%",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2b4c7e",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "50%",
    marginTop: 40,
  },
  buttonText: { color: "#dce0e6", fontWeight: "bold", fontSize: 16 },
});
