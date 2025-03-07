import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
} from "react-native";
import { registerUser } from "../services/api";

export default function RegisterUserScreen({ route }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = route?.params?.token || "";

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Erro", "Preencha todos os campos antes de cadastrar.");
      return;
    }

    Alert.alert("Confirmação", "Deseja realmente adicionar este usuário?", [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: async () => {
          try {
            const response = await registerUser({ name, email, password });

            Alert.alert(
              "Sucesso",
              response.message || "Usuário cadastrado com sucesso!"
            );
            setName("");
            setEmail("");
            setPassword("");
          } catch (error) {
            Alert.alert("Erro", error.message || "Falha ao cadastrar usuário");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Usuário</Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#dce0e6"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#dce0e6"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#dce0e6"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1f1f20",
    padding: 0,
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
    padding: 15,
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
