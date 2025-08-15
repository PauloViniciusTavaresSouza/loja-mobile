// src/screens/SettingsScreen.tsx

import { View, Text, Button, Image } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function SettingsScreen() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Você não está logado.</Text>
      </View>
    );
  }

  return (
    <View style={{ alignItems: 'center', padding: 20 }}>
      <Image
        source={{ uri: user.avatar }}
        style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
      />
      <Text style={{ fontSize: 20 }}>{user.username}</Text>
      <Text style={{ color: 'gray' }}>{user.email}</Text>


      <Button title="Sair" onPress={logout} />
    </View>
  );
}
