import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useAuth } from './src/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createMaterialTopTabNavigator();

type Produto = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

function MasculinoTab() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  console.log(produtos);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products/category/mens-shirts')
      .then((res) => setProdutos(res.data.products))
      .catch((err) => console.error('Erro:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#000" />;
  }

  return (
    <FlatList
      data={produtos}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push({ pathname: '/produto/[id]', params: { id: item.id.toString() } })}
        >
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

function FemininoTab() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  console.log(produtos);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products/category/womens-bags')
      .then((res) => setProdutos(res.data.products))
      .catch((err) => console.error('Erro:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#000" />;
  }

  return (
    <FlatList
      data={produtos}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push({ pathname: '/produto/[id]', params: { id: item.id.toString() } })}
        >
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

function HomeTeste() {
  return (
    <Text style={styles.description}>Aqui é a HOME</Text>
  )
}
export default function HomeScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  }, [user]);

  function handleLogout() {
    logout();
    router.replace('/');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titlePrincipal}>Bem-vindo, {user?.email}</Text>
      <Tab.Navigator>
        <Tab.Screen name="Masculino" component={MasculinoTab} />
        <Tab.Screen name="Feminino" component={FemininoTab} />
        <Tab.Screen name="Home" component={SettingsScreen} />

      </Tab.Navigator>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    backgroundColor: '#fff',
  },
  titlePrincipal: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  item: {
    fontSize: 16,
    paddingVertical: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  card: {
    flex: 1, // <-- ESSENCIAL PARA DIVIDIR A LINHA
    backgroundColor: '#fff',
    padding: 8,
    margin: 8,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00aa00',
  },
});
