import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
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
      
                Alert.alert("Sucesso", response.message || "Usuário cadastrado com sucesso!");
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
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Senha"
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
    container: { flex: 1, padding: 20, justifyContent: "center" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    input: { borderWidth: 1, padding: 12, marginBottom: 10, borderRadius: 8, borderColor: "#ccc" },
    button: { backgroundColor: "#4caf50", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 10 },
    buttonText: { color: "#fff", fontWeight: "bold" },
  });
  