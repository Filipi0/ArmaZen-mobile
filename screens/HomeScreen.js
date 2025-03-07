import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation, route }) {
  const [token, setToken] = useState("");

  useEffect(() => {
    const loadToken = async () => {
      if (route?.params?.token) {
        setToken(route.params.token);
        await AsyncStorage.setItem("userToken", route.params.token);
      } else {
        const storedToken = await AsyncStorage.getItem("userToken");
        if (storedToken) {
          setToken(storedToken);
        } else {
          Alert.alert("Erro", "Token não encontrado. Faça login novamente.");
          navigation.replace("Login");
        }
      }
    };

    loadToken();
  }, [route?.params?.token]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    Alert.alert("Logout", "Logout realizado com sucesso!");
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      {/*Conteúdo Principal */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Bem-vindo ao ArmaZen!</Text>
        <Text style={styles.subText}>Gerenciador de estoques.</Text>
      </View>

      {/*Botão de Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1f1f20" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2b4c7e",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuIcon: { width: 30, height: 30, tintColor: "#dce0e6" },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
  },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  welcomeText: {
    color: "#dce0e6",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subText: { color: "#606d80", fontSize: 16 },
  logoutButton: {
    backgroundColor: "#f44336",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    margin: 20,
    alignItems: "center",
    alignSelf: "center",
    width: "50%",
    marginBottom: 60,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
