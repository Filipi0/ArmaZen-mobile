import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

// Importando as telas
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterUserScreen from "./screens/RegisterUserScreen";
import ListUsersScreen from "./screens/ListUsersScreen";
import CadastroProdutoScreen from "./screens/CadastroProdutoScreen";
import ListaProdutosScreen from "./screens/ListaProdutosScreen";
import MovimentarProdutoScreen from "./screens/MovimentarProdutoScreen";
import RelatorioScreen from "./screens/RelatorioScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// 🔥 Componente para o Header com Botão de Menu
const CustomHeader = ({ navigation, title }) => {
  return {
    headerStyle: { backgroundColor: "#2b4c7e" },
    headerTintColor: "#fff",
    headerTitleStyle: { fontWeight: "bold" },
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Image source={require("./assets/menu-icon.png")} style={styles.menuIcon} />
      </TouchableOpacity>
    ),
    title,
  };
};

// 🔥 Menu Lateral (Drawer Navigation)
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: "#1f1f20" },
        drawerLabelStyle: { color: "#dce0e6", fontSize: 16 },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={({ navigation }) => CustomHeader({ navigation, title: "Home" })} />
      <Drawer.Screen name="RegisterUser" component={RegisterUserScreen} options={({ navigation }) => CustomHeader({ navigation, title: "Cadastrar Usuário" })} />
      <Drawer.Screen name="ListUsers" component={ListUsersScreen} options={({ navigation }) => CustomHeader({ navigation, title: "Lista de Usuários" })} />
      <Drawer.Screen name="CadastroProduto" component={CadastroProdutoScreen} options={({ navigation }) => CustomHeader({ navigation, title: "Cadastrar Produto" })} />
      <Drawer.Screen name="ListaProdutos" component={ListaProdutosScreen} options={({ navigation }) => CustomHeader({ navigation, title: "Lista de Produtos" })} />
      <Drawer.Screen name="MovimentarProduto" component={MovimentarProdutoScreen} options={({ navigation }) => CustomHeader({ navigation, title: "Movimentar Produto" })} />
      <Drawer.Screen name="Relatorio" component={RelatorioScreen} options={({ navigation }) => CustomHeader({ navigation, title: "Relatórios" })} />
    </Drawer.Navigator>
  );
}

// 🔥 Stack Navigator para iniciar no Login e depois ir para o menu lateral
function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainApp" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menuButton: { marginLeft: 25, marginRight: 10 },
  menuIcon: { width: 25, height: 25, tintColor: "#dce0e6" },
});
