import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet } from "react-native";
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
          <Text style={styles.detailTitle}>Detalhes: {categories.find(c => c.key === selectedCategory)?.label}</Text>
          
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={details[selectedCategory]}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.detailItem}>
                  <Text>{item.name} - {item.quantity} {item.unit}</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  cardsContainer: { marginBottom: 10 }, // 🔥 Envolve os cards para evitar erro
  card: { backgroundColor: "#f1f1f1", padding: 15, borderRadius: 10, marginBottom: 10, alignItems: "center" },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  countText: { fontSize: 16, color: "#666", marginTop: 5 },
  detailContainer: { flex: 1, marginTop: 20, padding: 15, backgroundColor: "#e6e6e6", borderRadius: 10 },
  detailTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  detailItem: { padding: 10, borderBottomWidth: 1, borderColor: "#ccc" },
});
