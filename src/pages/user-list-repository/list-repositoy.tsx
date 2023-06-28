import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import RepositoryEntity from '../../entities/repository-entity';
import { useRoute } from '@react-navigation/native';
import UserEntity from '../../entities/users-entity';

interface RepositoryListProps {
  navigation: any;
}

interface RouteParams {
  user?: UserEntity;
}

export default function RepositoryList({ navigation }: RepositoryListProps) {
  const [repositories, setRepositories] = useState<RepositoryEntity[]>([]);
  const [searchText, setSearchText] = useState("");
  const route = useRoute();
  const { user }: RouteParams = route.params || {};

  useEffect(() => {
    if (user) {
      fetch(user.url)
        .then((response) => response.json())
        .then((repos) => {
          const repositoryItems: RepositoryEntity[] = repos.map((repo: any) => ({
            name: repo.name,
            fullName: repo.full_name,
            private: repo.private,
            gitUrl: repo.git_url,
            createdAt: repo.created_at,
            watchers: repo.watchers,
            language: repo.language,
            forks: repo.forks,
            defaultBranch: repo.default_branch,
            description: repo.description,
          }));

          setRepositories(repositoryItems);
        })
        .catch((error) => console.log('error', error));
    }
  }, [user]);

  const filteredRepositories = repositories.filter(repository =>
    repository.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        {user && user.avatar && <Image source={{ uri: user.avatar }} style={styles.avatar} />}
        <Text style={styles.userTitle}>{user && user.name}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar Repositório"
        value={searchText}
        onChangeText={setSearchText}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {filteredRepositories.map((repository) => (
          <TouchableOpacity
            key={repository.name}
            onPress={() => navigation.navigate('DetailsRepository', { repository })}
          >
            <Text>{repository.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
});
