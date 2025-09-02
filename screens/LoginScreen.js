import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { login } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      const response = await login(email, password);
      const token = response.token;

      await AsyncStorage.setItem("userToken", token);
      navigation.replace("MainApp");
    } catch (error) {
      Alert.alert(
        "Erro no Login",
        error.response?.data?.error || "Falha ao realizar login. Verifique suas credenciais."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header com Logo/Título */}
        <View style={styles.header}>
         
          <Text style={styles.title}>ArmaZen</Text>
          <Text style={styles.subtitle}>Sistema de Gestão de Estoque</Text>
        </View>

        {/* Card de Login */}
        <View style={styles.loginCard}>
          <Text style={styles.loginTitle}>Faça seu login</Text>
          <Text style={styles.loginSubtitle}>Entre com suas credenciais para acessar o sistema</Text>

          {/* Input de Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>📧 Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              placeholderTextColor="#a0a6b8"
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setEmail}
              editable={!loading}
            />
          </View>

          {/* Input de Senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>🔒 Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Digite sua senha"
                placeholderTextColor="#a0a6b8"
                secureTextEntry={secureText}
                value={password}
                onChangeText={setPassword}
                editable={!loading}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setSecureText(!secureText)}
                disabled={loading}
              >
                <Image
                  source={secureText ? require("../assets/eye.png") : require("../assets/eye-off.png")}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Botão de Login */}
          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Entrando..." : "Entrar"}
            </Text>
          </TouchableOpacity>
        </View>

       
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>ArmaZen v1.0.0</Text>
          <Text style={styles.footerSubText}>Powered by React Native & Expo</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f20",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 25,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },

 
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#dce0e6",
    marginTop: 20,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#606d80",
    textAlign: "center",
    lineHeight: 22,
  },
  loginCard: {
    backgroundColor: "#2b4c7e",
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#dce0e6",
    textAlign: "center",
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 14,
    color: "#a0a6b8",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: "#dce0e6",
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#606d80",
    color: "#dce0e6",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#606d80",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    color: "#dce0e6",
    fontSize: 16,
  },
  eyeButton: {
    padding: 16,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: "#a0a6b8",
  },
  button: {
    backgroundColor: "#567ebb",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#567ebb",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: "#4a5568",
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  featuresContainer: {
    backgroundColor: "#2b4c7e",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#dce0e6",
    textAlign: "center",
    marginBottom: 20,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: "#a0a6b8",
    flex: 1,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#567ebb",
    marginBottom: 4,
  },
  footerSubText: {
    fontSize: 12,
    color: "#606d80",
  },
});
