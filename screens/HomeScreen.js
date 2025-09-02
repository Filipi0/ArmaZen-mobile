import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Dimensions,
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

  const menuItems = [
    {
      title: "Produtos",
      description: "Gerencie seu catálogo de produtos",
      color: "#4caf50",
      navigateTo: "ListaProdutos"
    },
    {
      title: "Usuários",
      description: "Administre usuários do sistema",
      color: "#2196f3",
      navigateTo: "ListUsers"
    },
    {
      title: "Movimentações",
      description: "Controle entrada e saída de estoque",
      color: "#ff9800",
      navigateTo: "MovimentacoesEstoque"
    },
    {
      title: "Relatórios",
      description: "Visualize estatísticas e relatórios",
      color: "#9c27b0",
      navigateTo: "Relatorio"
    }
  ];

  const handleNavigate = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header de Boas-vindas */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Bem-vindo ao ArmaZen!</Text>
          <Text style={styles.subText}>
            Seu sistema completo de gerenciamento de estoques
          </Text>
        </View>

        {/* Cards de Navegação Rápida */}
        <View style={styles.cardsContainer}>
          <Text style={styles.sectionTitle}>Acesso Rápido</Text>
          <View style={styles.cardsGrid}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.card, { borderLeftColor: item.color }]}
                onPress={() => handleNavigate(item.navigateTo)}
                activeOpacity={0.7}
              >
                <View style={styles.cardContent}>
                  <View style={[styles.cardIcon, { backgroundColor: item.color }]}>
                    <Text style={styles.cardIconText}>
                      {item.title.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDescription}>{item.description}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Informações do Sistema */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Sistema</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              • Interface intuitiva e moderna
            </Text>
            <Text style={styles.infoText}>
              • Controle completo de estoque
            </Text>
            <Text style={styles.infoText}>
              • Relatórios em tempo real
            </Text>
            <Text style={styles.infoText}>
              • Segurança com autenticação JWT
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#1f1f20" 
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  welcomeSection: {
    alignItems: "center",
    marginBottom: 30,
    paddingVertical: 20,
  },
  welcomeText: {
    color: "#dce0e6",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subText: { 
    color: "#606d80", 
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  sectionTitle: {
    color: "#dce0e6",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  cardsContainer: {
    marginBottom: 30,
  },
  cardsGrid: {
    gap: 15,
  },
  card: {
    backgroundColor: "#2b4c7e",
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  cardIconText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    color: "#dce0e6",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardDescription: {
    color: "#cacbceff",
    fontSize: 14,
    lineHeight: 18,
  },
  infoSection: {
    marginTop: 10,
  },
  infoCard: {
    backgroundColor: "#2b4c7e",
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#567ebb",
  },
  infoText: {
    color: "#dce0e6",
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
});
