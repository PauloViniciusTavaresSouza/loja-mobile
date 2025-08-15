// src/screens/LoginScreen.tsx
import { router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [senhaError, setSenhaError] = useState(false);
  const [successLogin, setSuccessLogin] = useState(false);
  const [loginTentado, setLoginTentado] = useState(false);

  function handleLogin() {
    let hasError = false;

    if (!email) {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    if (!senha) {
      setSenhaError(true);
      hasError = true;
    } else {
      setSenhaError(false);
    }

    if (hasError) return;
    setLoginTentado(true);

    const success = login(email, senha); // aqui vai username (que você chama de email) + senha

    success ? setSuccessLogin(true) : setSuccessLogin(false)

    if (success) {
      router.replace('/home');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bem-vindo de volta!</Text>
      <Text style={styles.descricao}>
        Insira seus dados para entrar na sua conta.
      </Text>

      <View style={styles.content}>
        {loginTentado && !successLogin && (
          <Text style={styles.errorLogin}>Username ou senha inválidos</Text>
        )}
        <View style={styles.containerInput}>
          <Text style={styles.label}>Usuário</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          {emailError && <Text style={styles.error}>Campo obrigatório</Text>}
        </View>

        <View style={styles.containerInput}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
          {senhaError && <Text style={styles.error}>Campo obrigatório</Text>}
        </View>

        <Button color="#2567E8" title="Entrar" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#2567E8',
  },
  content: {
    flex: 1,
    padding: 25,
    margin: 10,
    maxHeight: 300,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: '#BDBDBD',
    borderWidth: 2,
    borderRadius: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#fff'
  },
  descricao: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 24,
    textAlign: 'center',
    color: '#fff'
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  containerInput: {
    padding: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600'
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
  errorLogin: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center'
  },

});
