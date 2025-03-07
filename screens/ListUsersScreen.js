import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUsers, deleteUser } from "../services/api";

export default function ListUsersScreen({ route }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const loadToken = async () => {
      if (route?.params?.token) {
        setToken(route.params.token);
      } else {
        const storedToken = await AsyncStorage.getItem("userToken");
        if (storedToken) {
          setToken(storedToken);
        } else {
          Alert.alert("Erro", "Token não encontrado. Faça login novamente.");
        }
      }
    };

    loadToken();
  }, [route?.params?.token]);

  useEffect(() => {
    if (token) {
      loadUsers();
    }
  }, [token]);

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
        },
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
          <View style={styles.userCard}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => confirmDelete(item.id, item.name)}
            >
              <Text style={styles.deleteButtonText}>Excluir Usuário</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
  userCard: {
    backgroundColor: "#2b4c7e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  userName: { fontSize: 18, fontWeight: "bold", color: "#dce0e6" },
  userEmail: { fontSize: 14, color: "#dce0e6", marginBottom: 10 },
  deleteButton: {
    backgroundColor: "#dce0e6",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    width: "40%",
    alignSelf: "flex-end",
  },
  deleteButtonText: { color: "#606d80", fontWeight: "bold" },
});
