import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { login } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true); 

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      const token = response.token;

      await AsyncStorage.setItem("userToken", token);

      navigation.replace("MainApp"); // Redireciona para a HomeScreen
    } catch (error) {
      Alert.alert(
        "Erro",
        error.response?.data?.error || "Falha ao realizar login"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao ArmaZen</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#dce0e6"
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          placeholderTextColor="#dce0e6"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setSecureText(!secureText)}
        >
          <Image
            source={secureText ? require("../assets/eye.png") : require("../assets/eye-off.png")}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#dce0e6",
    marginBottom: 10,
  },
  subtitle: { fontSize: 16, color: "#dce0e6", marginBottom: 40 },
  input: {
    backgroundColor: "#606d80",
    color: "#dce0e6",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    width: "80%",
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#606d80",
    borderRadius: 8,
    width: "80%",
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    color: "#dce0e6",
    fontSize: 16,
  },
  eyeButton: {
    padding: 10,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: "#dce0e6",
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
