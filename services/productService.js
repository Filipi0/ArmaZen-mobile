import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://armazen.onrender.com/api"; // 🔥 Verifique se a URL está correta

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

// 📌 Criar um novo produto (Apenas Admin)
export const createProduct = async (productData) => {
  try {
    const headers = await getAuthHeader();
    
    console.log("📩 Enviando produto para API:", productData); // 🔥 Log para depuração

    const response = await api.post("/products", productData, { headers });

    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Erro ao cadastrar produto");
  }
};

// 📌 Listar todos os produtos (Admin e Usuários vinculados)
export const fetchProducts = async () => {
  try {
    const headers = await getAuthHeader();
    const response = await api.get("/products", { headers });

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Erro ao buscar produtos");
  }
};

// 📌 Deletar um produto pelo ID (Apenas Admin)
export const deleteProduct = async (productId) => {
  try {
    const headers = await getAuthHeader();
    const response = await api.delete(`/products/${productId}`, { headers });

    return response.data;
  } catch (error) {
    console.error("Erro ao deletar produto:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Erro ao deletar produto");
  }
};

// 📌 Atualizar a quantidade do produto no estoque (Incrementar/Decrementar)
export const updateProductQuantity = async (productId, action, amount) => {
  try {
    const headers = await getAuthHeader();
    const response = await api.patch(`/products/${productId}/update-quantity`, 
      { action, amount }, { headers });

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar quantidade:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Erro ao atualizar a quantidade do produto");
  }
};
