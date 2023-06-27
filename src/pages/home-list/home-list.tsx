import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export default function UserSearch() {
  const [username, setUsername] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const handleSearch = () => {
    
    setSearchResult(`Usuário encontrado: ${username}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pesquisar Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do usuário"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Pesquisar" onPress={handleSearch} />
      <Text style={styles.result}>{searchResult}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  result: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
});