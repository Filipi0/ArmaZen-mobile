import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { fetchStockDetails } from "../services/stockService";

export default function RelatorioScreen() {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { key: "low-stock", label: "Itens prestes a esgotar" },
    { key: "near-expiration", label: "Itens perto do vencimento" },
    { key: "expired-this-month", label: "Itens expirados durante o mês" },
    { key: "out-of-stock-this-month", label: "Itens esgotados durante o mês" },
    { key: "untouched-this-month", label: "Itens não movimentados no mês" },
    { key: "most-moved-items", label: "Itens mais movimentados no mês" },
  ];

  // 🔥 Atualiza automaticamente ao entrar na tela
  useFocusEffect(
    useCallback(() => {
      setSelectedCategory(null);
      setDetails({});
    }, [])
  );

  const loadStockDetails = async (categoryKey) => {
    setLoading(true);
    try {
      const data = await fetchStockDetails(categoryKey);
      setDetails((prevDetails) => ({ ...prevDetails, [categoryKey]: data }));
      setSelectedCategory(categoryKey);
    } catch (error) {
      alert(error.message || "Erro ao buscar detalhes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatórios</Text>

      {/* 🔹 Renderiza os cartões de relatórios */}
      <View style={styles.cardsContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={styles.card}
            onPress={() => loadStockDetails(category.key)}
          >
            <Text style={styles.cardTitle}>{category.label}</Text>
            <Text style={styles.countText}>
              {details[category.key] ? details[category.key].length : "?"} itens
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🔹 Exibir detalhes da categoria selecionada */}
      {selectedCategory && (
        <View style={styles.detailContainer}>
          <Text style={styles.detailTitle}>
            Detalhes: {categories.find((c) => c.key === selectedCategory)?.label}
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color="#dce0e6" />
          ) : (
            <FlatList
              data={details[selectedCategory]}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.detailItem}>
                  <Text style={styles.detailText}>
                    {item.name} - {item.quantity} {item.unit}
                  </Text>
                </View>
              )}
              style={{ flexGrow: 1 }}
            />
          )}
        </View>
      )}
    </View>
  );
}

// 🔥 **Estilização baseada na paleta de cores**
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#1f1f20" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#dce0e6",
    marginBottom: 20,
    textAlign: "center",
  },
  cardsContainer: { marginBottom: 10 },
  card: {
    backgroundColor: "#2b4c7e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#dce0e6" },
  countText: { fontSize: 16, color: "#dce0e6", marginTop: 5 },
  detailContainer: {
    flex: 1,
    marginTop: 20,
    padding: 15,
    backgroundColor: "#567ebb",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#dce0e6",
    marginBottom: 10,
  },
  detailItem: { padding: 10, borderBottomWidth: 1, borderColor: "#ccc" },
  detailText: { fontSize: 16, color: "#dce0e6" },
});
