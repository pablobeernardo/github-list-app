import React, { useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import UserEntity from "../../entities/users-entity";

interface ListUserProps {
  navigation: any;
}

export default function ListUser({ navigation }: ListUserProps) {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchStarted, setSearchStarted] = useState(false);

  const handleSearch = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer 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");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`https://api.github.com/users/${searchQuery}`, requestOptions)
      .then((response) => response.json())
      .then((user) => {
        if (user.message) {
          setUsers([]);
        } else {
          const userData: UserEntity = {
            name: user.name,
            login: user.login,
            avatar: user.avatar_url,
            url: user.repos_url,
          };
          setUsers([userData]);
        }
      })
      .catch((error) => console.log("error", error));

    setSearchStarted(true);
  };
  
  const handleInputChange = (text: string) => {
    setSearchQuery(text);
    if (text.length < 3) {
      setSearchStarted(false);
    }
  };

  const handleUserPress = (user: UserEntity) => {
    navigation.navigate('RepositoryList', { user });
  };

  const renderUser = ({ item }: { item: UserEntity }) => (
    <TouchableOpacity onPress={() => handleUserPress(item)}>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: item.avatar }}
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
          />
          <Text>{item.login}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GitHub List</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Pesquise um usuário"
          value={searchQuery}
          onChangeText={handleInputChange}
        />
        <TouchableOpacity onPress={handleSearch} disabled={searchQuery.length < 3}>
          <Text style={{ textAlign:'center', color: searchQuery.length < 3 ? "gray" : "blue" }}>
            Pesquisar
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.result}>
        {searchStarted && (
          <FlatList
            data={users}
            renderItem={renderUser}
            keyExtractor={(item) => item.login}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 200,
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
  result:{
    flex: 1,
    padding: 35
  }
});
