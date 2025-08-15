import React, { createContext, useContext, useState } from 'react';

// Tipo do usuário
type User = {
  username: string;
  email: string;
  avatar?: string;
};

// Tipo do contexto de autenticação
type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

// Criação do contexto com valores iniciais falsos
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => { },
});

// Mock de usuários válidos
const mockUsers = [
  { username: 'paulo', password: '123', email: 'paulo@email.com', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJCMCKPE9hMAhZej46Jutn1D2P6PtKdUFYW9IgUhEdqxkeB4Bvz=s96-c-rg-br100', },
  { username: 'joao', password: '321', email: 'joao@email.com' },
];

// Provider do contexto
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  function login(username: string, password: string): boolean {
    const foundUser = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser({ username: foundUser.username, email: foundUser.email, avatar: foundUser.avatar, });
      return true;
    } else {
      return false;
    }
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook de uso do contexto
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
