import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { fetchProducts } from "../services/productService";
import { registrarMovimentacao, buscarMovimentacoes } from "../services/stockService";

export default function MovimentacoesEstoqueScreen() {
  const [movements, setMovements] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Estados para nova movimentação
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [movementType, setMovementType] = useState("entrada");
  
  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("todos");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([loadMovements(), loadProducts()]);
    } catch (error) {
      Alert.alert("Erro", "Falha ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  const loadMovements = async () => {
    try {
      const data = await buscarMovimentacoes();
      setMovements(data);
    } catch (error) {
      Alert.alert("Erro", error.message || "Falha ao buscar movimentações");
    }
  };

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      Alert.alert("Erro", error.message || "Falha ao buscar produtos");
    }
  };

  const handleAddMovement = async () => {
    if (!selectedProductId || !quantity) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios");
      return;
    }

    const quantityNum = parseFloat(quantity);
    if (isNaN(quantityNum) || quantityNum <= 0) {
      Alert.alert("Erro", "Quantidade deve ser um número positivo");
      return;
    }

    try {
      await registrarMovimentacao(
        parseInt(selectedProductId),
        quantityNum,
        movementType
      );
      
      Alert.alert("Sucesso", "Movimentação registrada com sucesso!");
      
      // Reset form
      setSelectedProductId("");
      setQuantity("");
      setMovementType("entrada");
      setModalVisible(false);
      
      // Reload data
      await loadMovements();
    } catch (error) {
      Alert.alert("Erro", error.message || "Falha ao registrar movimentação");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR") + " " + date.toLocaleTimeString("pt-BR", { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : "Produto não encontrado";
  };

  const filteredMovements = movements.filter(movement => {
    const matchesSearch = getProductName(movement.productId)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "todos" || movement.movementType === filterType;
    
    return matchesSearch && matchesType;
  });

  const renderMovementItem = ({ item }) => (
    <View style={[
      styles.movementCard,
      item.movementType === "entrada" ? styles.entradaCard : styles.saidaCard
    ]}>
      <View style={styles.movementHeader}>
        <Text style={styles.productName}>{getProductName(item.productId)}</Text>
        <Text style={[
          styles.movementType,
          item.movementType === "entrada" ? styles.entradaText : styles.saidaText
        ]}>
          {item.movementType.toUpperCase()}
        </Text>
      </View>
      
      <Text style={styles.quantity}>Quantidade: {item.quantity}</Text>
      <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
      
      {item.user && (
        <Text style={styles.userInfo}>
          Usuário: {item.user.name} ({item.user.email})
        </Text>
      )}
      
      {item.userAdmin && (
        <Text style={styles.adminInfo}>
          Admin: {item.userAdmin.name} ({item.userAdmin.email})
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movimentações de Estoque</Text>
      
      {/* Filtros */}
      <View style={styles.filtersContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar produto..."
          placeholderTextColor="#dce0e6"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        
        <View style={styles.filterPicker}>
          <Picker
            selectedValue={filterType}
            onValueChange={setFilterType}
            style={styles.picker}
            dropdownIconColor="#dce0e6"
          >
            <Picker.Item label="Todos" value="todos" color="#5d6167ff" />
            <Picker.Item label="Entrada" value="entrada" color="#5d6167ff" />
            <Picker.Item label="Saída" value="saida" color="#5d6167ff" />
          </Picker>
        </View>
      </View>

      {/* Lista de movimentações */}
      {loading ? (
        <Text style={styles.loadingText}>Carregando movimentações...</Text>
      ) : (
        <FlatList
          data={filteredMovements}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovementItem}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Botão para adicionar nova movimentação */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Nova Movimentação</Text>
      </TouchableOpacity>

      {/* Modal para nova movimentação */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Nova Movimentação</Text>
              
              <Text style={styles.label}>Produto:</Text>
              <View style={styles.productPicker}>
                <Picker
                  selectedValue={selectedProductId}
                  onValueChange={setSelectedProductId}
                  style={styles.picker}
                  dropdownIconColor="#dce0e6"
                >
                  <Picker.Item label="Selecione um produto" value="" color="#5d6167ff" />
                  {products.map(product => (
                    <Picker.Item 
                      key={product.id} 
                      label={product.name} 
                      value={product.id.toString()}
                      color="#7f7f7fff"
                    />
                  ))}
                </Picker>
              </View>
              
              <Text style={styles.label}>Quantidade:</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite a quantidade"
                placeholderTextColor="#dce0e6"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
              />
              
              <Text style={styles.label}>Tipo de Movimentação:</Text>
              <View style={styles.typePicker}>
                <Picker
                  selectedValue={movementType}
                  onValueChange={setMovementType}
                  style={styles.picker}
                  dropdownIconColor="#dce0e6"
                >
                  <Picker.Item label="Entrada" value="entrada" color="#5d6167ff" />
                  <Picker.Item label="Saída" value="saida" color="#5d6167ff" />
                </Picker>
              </View>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.confirmButton}
                  onPress={handleAddMovement}
                >
                  <Text style={styles.confirmButtonText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f20",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#dce0e6",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  filtersContainer: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#606d80",
    color: "#dce0e6",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  filterPicker: {
    backgroundColor: "#606d80",
    borderRadius: 8,
    height: 60,
    justifyContent: "center",
  },
  picker: {
    color: "#dce0e6",
    backgroundColor: "#606d80",
    height: 60,
  },
  loadingText: {
    color: "#dce0e6",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  list: {
    flex: 1,
  },
  movementCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  entradaCard: {
    backgroundColor: "#2d5a2d",
    borderLeftWidth: 4,
    borderLeftColor: "#4caf50",
  },
  saidaCard: {
    backgroundColor: "#5a2d2d",
    borderLeftWidth: 4,
    borderLeftColor: "#f44336",
  },
  movementHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#dce0e6",
    flex: 1,
  },
  movementType: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  entradaText: {
    backgroundColor: "#4caf50",
    color: "#fff",
  },
  saidaText: {
    backgroundColor: "#f44336",
    color: "#fff",
  },
  quantity: {
    fontSize: 16,
    color: "#dce0e6",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#b9c3cdff",
    marginBottom: 4,
  },
  userInfo: {
    fontSize: 12,
    color: "#b9c3cdff",
  },
  adminInfo: {
    fontSize: 12,
    color: "#b9c3cdff",
  },
  addButton: {
    backgroundColor: "#567ebb",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1f1f20",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#dce0e6",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#dce0e6",
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#606d80",
    color: "#dce0e6",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  productPicker: {
    backgroundColor: "#606d80",
    borderRadius: 8,
    marginBottom: 10,
    height: 60,
    justifyContent: "center",
  },
  typePicker: {
    backgroundColor: "#606d80",
    borderRadius: 8,
    marginBottom: 20,
    height: 60,
    justifyContent: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: "#4caf50",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
