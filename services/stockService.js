import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://armazen.onrender.com/api"; // Verifique se esta é a URL correta

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 Função para obter o token JWT
const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem("userToken");
  if (!token) throw new Error("Token ausente");
  return { Authorization: `Bearer ${token}` };
};

// 📌 Buscar os detalhes do estoque com base no tipo de filtro
export const fetchStockDetails = async (filterType) => {
  try {
    const headers = await getAuthHeader();
    const response = await api.get(`/stock-details/${filterType}`, { headers });

    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar '${filterType}':`, error.response?.data || error.message);
    throw new Error(error.response?.data?.error || `Erro ao buscar '${filterType}'`);
  }
};
