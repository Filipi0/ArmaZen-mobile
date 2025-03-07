import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterUserScreen from "./screens/RegisterUserScreen";
import ListUsersScreen from "./screens/ListUsersScreen";
import CadastroProdutoScreen from "./screens/CadastroProdutoScreen"; // 🔥 Nova tela
import ListaProdutosScreen from "./screens/ListaProdutosScreen"; // 🔥 Nova tela
import MovimentarProdutoScreen from "./screens/MovimentarProdutoScreen"; // 🔥 Nova tela

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterUser" component={RegisterUserScreen} options={{ title: "Cadastrar Usuário" }} />
        <Stack.Screen name="ListUsers" component={ListUsersScreen} options={{ title: "Lista de Usuários" }} />
        <Stack.Screen name="CadastroProduto" component={CadastroProdutoScreen} options={{ title: "Cadastrar Produto" }} />
        <Stack.Screen name="ListaProdutos" component={ListaProdutosScreen} options={{ title: "Lista de Produtos" }} />
        <Stack.Screen name="MovimentarProduto" component={MovimentarProdutoScreen} options={{ title: "Movimentar Produto" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
