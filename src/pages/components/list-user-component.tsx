import React, { useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import UserEntity from "../../entities/users-entity";
import { Image } from "expo-image";

export default function ListUser() {
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
            url: user.html_url,
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

  const renderUser = ({ item }: { item: UserEntity }) => (
    <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
            source={{ uri: item.avatar }}
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
        />
        <Text>{item.login}</Text>
        </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="Search users"
          value={searchQuery}
          onChangeText={handleInputChange}
        />
        <TouchableOpacity onPress={handleSearch} disabled={searchQuery.length < 3}>
          <Text style={{ marginLeft: 10, color: searchQuery.length < 3 ? "gray" : "blue" }}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
      <View>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop:50
  },
});