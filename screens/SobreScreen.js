import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function SobreScreen({ navigation }) {
  const features = [
    {
      title: "🏠 Home",
      description: "Tela principal com acesso rápido a todas as funcionalidades do sistema através de cards visuais."
    },
    {
      title: "👥 Usuários",
      description: "Gerenciamento completo de usuários do sistema, incluindo cadastro, listagem e administração de permissões."
    },
    {
      title: "📦 Produtos",
      description: "Catálogo completo de produtos com cadastro, edição, visualização e controle de informações detalhadas."
    },
    {
      title: "📊 Movimentações de Estoque",
      description: "Controle detalhado de entrada e saída de produtos, com histórico completo e filtros avançados."
    },
    {
      title: "📈 Relatórios",
      description: "Visualização de dados estatísticos, gráficos e relatórios detalhados sobre o estoque e movimentações."
    }
  ];

  const systemInfo = [
    {
      title: "🔐 Segurança",
      items: [
        "Autenticação JWT para proteção de dados",
        "Controle de sessão automático",
        "Logout seguro com confirmação"
      ]
    },
    {
      title: "📱 Interface",
      items: [
        "Design moderno e intuitivo",
        "Tema escuro para melhor experiência",
        "Navegação lateral (drawer) organizada",
        "Cards visuais para acesso rápido"
      ]
    },
    {
      title: "🚀 Funcionalidades",
      items: [
        "Busca e filtros em tempo real",
        "Feedback visual para todas as ações",
        "Validação de dados automática",
        "Sincronização com servidor em tempo real"
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Sobre o ArmaZen</Text>
          <Text style={styles.subtitle}>
            Sistema completo de gerenciamento de estoques
          </Text>
        </View>

        {/* Descrição Principal */}
        <View style={styles.section}>
          <Text style={styles.description}>
            O ArmaZen é uma solução completa e moderna para gerenciamento de estoques, 
            desenvolvida para facilitar o controle de produtos, usuários e movimentações 
            em tempo real. Com interface intuitiva e recursos avançados, oferece tudo 
            que você precisa para manter seu estoque organizado e eficiente.
          </Text>
        </View>

        {/* Telas do Sistema */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Telas do Sistema</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          ))}
        </View>

        {/* Informações do Sistema */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Características do Sistema</Text>
          {systemInfo.map((category, index) => (
            <View key={index} style={styles.infoCard}>
              <Text style={styles.infoTitle}>{category.title}</Text>
              {category.items.map((item, itemIndex) => (
                <Text key={itemIndex} style={styles.infoItem}>
                  • {item}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Tecnologias */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛠️ Tecnologias Utilizadas</Text>
          <View style={styles.techCard}>
            <Text style={styles.techTitle}>Frontend Mobile</Text>
            <Text style={styles.techItem}>• React Native (Expo 53)</Text>
            <Text style={styles.techItem}>• React Navigation</Text>
            <Text style={styles.techItem}>• AsyncStorage</Text>
            <Text style={styles.techItem}>• Axios para API</Text>
          </View>
          
          <View style={styles.techCard}>
            <Text style={styles.techTitle}>Backend</Text>
            <Text style={styles.techItem}>• API REST</Text>
            <Text style={styles.techItem}>• Autenticação JWT</Text>
            <Text style={styles.techItem}>• Banco de dados</Text>
          </View>
        </View>

        {/* Vantagens */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Principais Vantagens</Text>
          <View style={styles.advantagesList}>
            <Text style={styles.advantageItem}>🎯 Controle total do estoque em tempo real</Text>
            <Text style={styles.advantageItem}>📊 Relatórios detalhados e estatísticas</Text>
            <Text style={styles.advantageItem}>🔍 Busca e filtros avançados</Text>
            <Text style={styles.advantageItem}>👥 Gerenciamento de usuários e permissões</Text>
            <Text style={styles.advantageItem}>📱 Interface mobile responsiva</Text>
            <Text style={styles.advantageItem}>🔒 Segurança e proteção de dados</Text>
            <Text style={styles.advantageItem}>⚡ Performance otimizada</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ArmaZen v1.0.0
          </Text>
          <Text style={styles.footerSubText}>
            Desenvolvido com React Native e Expo
          </Text>
        </View>

        {/* Botão de Navegação */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f20",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#dce0e6",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#606d80",
    textAlign: "center",
    lineHeight: 22,
  },
  section: {
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    color: "#dce0e6",
    lineHeight: 24,
    textAlign: "justify",
    backgroundColor: "#2b4c7e",
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#567ebb",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#dce0e6",
    marginBottom: 15,
  },
  featureCard: {
    backgroundColor: "#2b4c7e",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#4caf50",
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#dce0e6",
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: "#abb0b9ff",
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: "#2b4c7e",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#ff9800",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#dce0e6",
    marginBottom: 10,
  },
  infoItem: {
    fontSize: 14,
    color: "#abb0b9ff",
    marginBottom: 6,
    lineHeight: 18,
  },
  techCard: {
    backgroundColor: "#2b4c7e",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#9c27b0",
  },
  techTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#dce0e6",
    marginBottom: 8,
  },
  techItem: {
    fontSize: 14,
    color: "#abb0b9ff",
    marginBottom: 4,
    lineHeight: 18,
  },
  advantagesList: {
    backgroundColor: "#2b4c7e",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#2196f3",
  },
  advantageItem: {
    fontSize: 15,
    color: "#dce0e6",
    marginBottom: 8,
    lineHeight: 22,
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#2b4c7e",
    borderRadius: 12,
  },
  footerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#dce0e6",
    marginBottom: 4,
  },
  footerSubText: {
    fontSize: 14,
    color: "#606d80",
  },
  backButton: {
    backgroundColor: "#567ebb",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
