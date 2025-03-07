import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { getUsers, deleteUser } from "../services/api";

export default function ListUsersScreen({ route }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const token = route.params.token; // Recebe token após login

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers(token);
      setUsers(data);
    } catch (error) {
      Alert.alert("Erro", "Falha ao carregar usuários");
    }
  };

  const confirmDelete = (userId, userName) => {
    Alert.alert("Confirmação", `Excluir usuário "${userName}"?`, [
      { text: "Cancelar" },
      { 
        text: "Excluir",
        onPress: async () => {
          try {
            await deleteUser(userId, token);
            Alert.alert("Sucesso", "Usuário excluído com sucesso!");
            loadUsers();
          } catch (error) {
            Alert.alert("Erro", "Falha ao excluir usuário");
          }
        } 
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>
      
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.userItem} 
            onPress={() => setSelectedUser(selectedUser === item.id ? null : item.id)}
          >
            <Text style={styles.userName}>{item.name}</Text>
            
            {selectedUser === item.id && (
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => confirmDelete(item.id, item.name)}
              >
                <Text style={styles.deleteButtonText}>Excluir Usuário</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  userItem: { padding: 15, borderRadius: 8, backgroundColor: "#f9f9f9", marginBottom: 10 },
  userName: { fontSize: 16, fontWeight: "bold" },
  deleteButton: { marginTop: 10, backgroundColor: "#f44336", padding: 10, borderRadius: 6 },
  deleteButtonText: { color: "#fff", textAlign: "center" },
});
