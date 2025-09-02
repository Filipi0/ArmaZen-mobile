import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Image, StyleSheet, Alert, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importando as telas
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterUserScreen from "./screens/RegisterUserScreen";
import ListUsersScreen from "./screens/ListUsersScreen";
import CadastroProdutoScreen from "./screens/CadastroProdutoScreen";
import ListaProdutosScreen from "./screens/ListaProdutosScreen";
// import MovimentarProdutoScreen from "./screens/MovimentarProdutoScreen";
import MovimentacoesEstoqueScreen from "./screens/MovimentacoesEstoqueScreen";
import RelatorioScreen from "./screens/RelatorioScreen";
import SobreScreen from "./screens/SobreScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CustomHeader = ({ navigation, title, showLogout = false }) => {
  const handleLogout = () => {
    Alert.alert(
      "Confirmar Logout",
      "Tem certeza que deseja sair do aplicativo?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("userToken");
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          }
        }
      ]
    );
  };

  return {
    headerStyle: { backgroundColor: "#2b4c7e" },
    headerTintColor: "#fff",
    headerTitleStyle: { fontWeight: "bold" },
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Image source={require("./assets/menu-icon.png")} style={styles.menuIcon} />
      </TouchableOpacity>
    ),
    headerRight: showLogout ? () => (
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    ) : undefined,
    title,
  };
};

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: "#1f1f20" },
        drawerLabelStyle: { color: "#dce0e6", fontSize: 16 },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={({ navigation }) => CustomHeader({ navigation, title: "Home", showLogout: true })} />
      <Drawer.Screen name="RegisterUser" component={RegisterUserScreen} options={({ navigation }) => CustomHeader({ navigation, title: "Cadastrar Usuário" })} />
      <Drawer.Screen name="ListUsers" component={ListUsersScreen} options={({ navigation }) => CustomHeader({ navigation, title: "Lista de Usuários" })} />
      <Drawer.Screen name="CadastroProduto" component={CadastroProdutoScreen} options={({ navigation }) => CustomHeader({ navigation, title: "Cadastrar Produto" })} />
      <Drawer.Screen name="ListaProdutos" component={ListaProdutosScreen} options={({ navigation }) => CustomHeader({ navigation, title: "Lista de Produtos" })} />
      <Drawer.Screen name="MovimentacoesEstoque" component={MovimentacoesEstoqueScreen} options={({ navigation }) => CustomHeader({ navigation, title: "Movimentações de Estoque" })} />
      <Drawer.Screen name="Relatorio" component={RelatorioScreen} options={({ navigation }) => CustomHeader({ navigation, title: "Relatórios" })} />
      <Drawer.Screen name="Sobre" component={SobreScreen} options={({ navigation }) => CustomHeader({ navigation, title: "Sobre" })} />
    </Drawer.Navigator>
  );
}

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
  logoutButton: { 
    marginRight: 25, 
    marginLeft: 10,
    backgroundColor: "#f44336",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  logoutText: { 
    color: "#fff", 
    fontSize: 14, 
    fontWeight: "bold" 
  },
});
