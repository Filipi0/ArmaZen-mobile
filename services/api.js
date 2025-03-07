import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://armazen.onrender.com/api"; // Ajuste se necessário

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 Função para obter o token do AsyncStorage
const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem("userToken");
  if (!token) throw new Error("Token ausente");
  return { Authorization: `Bearer ${token}` };
};

// 🔹 Cadastro de usuário (Mesma lógica do Next.js, mas adaptada)
export const registerUser = async (userData) => {
  try {
    const headers = await getAuthHeader();
    const response = await api.post("/register", userData, { headers });

    return response.data;
  } catch (error) {
    console.log("Erro ao cadastrar usuário:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Erro ao cadastrar usuário");
  }
};

// 🔹 Login de usuário
export const login = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });

    // Salvar token no AsyncStorage
    await AsyncStorage.setItem("userToken", response.data.token);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Erro ao fazer login");
  }
};

// 🔹 Listar usuários
export const getUsers = async () => {
  try {
    const headers = await getAuthHeader();
    const response = await api.get("/users", { headers });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Erro ao buscar usuários");
  }
};

// 🔹 Excluir usuário
export const deleteUser = async (userId) => {
  try {
    const headers = await getAuthHeader();
    const response = await api.delete(`/users/${userId}`, { headers });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Erro ao excluir usuário");
  }
};
