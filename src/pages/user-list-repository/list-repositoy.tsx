import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView } from 'react-native';
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
      <Text style={styles.userTitle}>{user && user.name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar Repositório"
        value={searchText}
        onChangeText={setSearchText}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {filteredRepositories.map((repository) => (
          <Text key={repository.name}>{repository.name}</Text>
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
  userTitle: {
    fontSize: 18,
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
