// app/produto/[id].tsx
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProdutoScreen() {
  const { id } = useLocalSearchParams();
  const [produto, setProduto] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => setProduto(res.data))
      .catch((err) => console.error('Erro ao buscar produto:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#000" />;
  }

  if (!produto) {
    return (
      <View style={styles.container}>
        <Text>Produto não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: produto.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{produto.title}</Text>
      <Text style={styles.description}>{produto.description}</Text>
      <Text style={styles.price}>R$ {produto.price.toFixed(2)}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => { }}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => { }}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00aa00',
  },
  buttonContainer: {
    flexDirection: 'column', // agora um embaixo do outro
    gap: 10,
    marginTop: 10,
    width: '100%',
  },

  button: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },

  editButton: {
    backgroundColor: '#007bff', // azul
  },

  deleteButton: {
    backgroundColor: '#dc3545', // vermelho
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

});
