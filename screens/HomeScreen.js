import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation, route }) {
  const [token, setToken] = useState("");

  useEffect(() => {
    const loadToken = async () => {
      // Verifica se o token foi passado pela navegação
      if (route?.params?.token) {
        setToken(route.params.token);
        await AsyncStorage.setItem("userToken", route.params.token); // Salva o token no AsyncStorage
      } else {
        // Caso contrário, recupera do AsyncStorage
        const storedToken = await AsyncStorage.getItem("userToken");
        if (storedToken) {
          setToken(storedToken);
        } else {
          Alert.alert("Erro", "Token não encontrado. Faça login novamente.");
          navigation.replace("Login"); // Redireciona para a tela de login
        }
      }
    };

    loadToken();
  }, [route?.params?.token]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken"); // Remove o token ao sair
    Alert.alert("Logout", "Logout realizado com sucesso!");
    navigation.replace("Login"); // Redireciona para a tela de login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login realizado com sucesso!</Text>

      {/* Botões para Usuários */}
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("RegisterUser", { token })}>
        <Text style={styles.buttonText}>Cadastrar Usuário</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("ListUsers", { token })}>
        <Text style={styles.buttonText}>Lista de Usuários</Text>
      </TouchableOpacity>

      {/* Botões para Produtos */}
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("CadastroProduto", { token })}>
        <Text style={styles.buttonText}>Cadastrar Produto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("ListaProdutos", { token })}>
        <Text style={styles.buttonText}>Lista de Produtos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("MovimentarProduto", { token })}>
        <Text style={styles.buttonText}>Movimentar Produto</Text>
      </TouchableOpacity>

      {/* 🔥 Botão para Relatórios */}
      <TouchableOpacity style={styles.reportButton} onPress={() => navigation.navigate("Relatorio", { token })}>
        <Text style={styles.buttonText}>Relatórios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

// 🔥 **Certifique-se de que `styles` está definido corretamente no final!**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4caf50",
  },
  navButton: {
    backgroundColor: "#2196f3",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
  },
  reportButton: {
    backgroundColor: "#ff9800", // Cor diferente para o botão de relatórios
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
