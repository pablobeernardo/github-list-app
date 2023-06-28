import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from 'react-native-vector-icons';
import RepositoryEntity from '../../entities/repository-entity';

interface RouteParams {
  repository?: RepositoryEntity;
}

export default function DetailsRepository() {
  const route = useRoute();
  const { repository }: RouteParams = route.params || {};

  if (!repository) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{repository.name}</Text>
        <Text style={styles.subtitle}>{repository.fullName}</Text>
      </View>
      <View style={styles.iconContainer}>
        {repository.private ? (
          <FontAwesome name="lock" size={20} color="red" />
        ) : (
          <FontAwesome name="globe" size={20} color="green" />
        )}
        <Text style={styles.iconText}>{repository.private ? 'Private' : 'Public'}</Text>
      </View>
      <View style={styles.listStyle}>
        <Text style={styles.descriptionStyle}>Description: {repository.description}</Text>
        <Text style={styles.descriptionStyle}>URL: {repository.gitUrl}</Text>
        <Text style={styles.descriptionStyle}>Created At: {repository.createdAt}</Text>
        <Text style={styles.descriptionStyle}>Watchers: {repository.watchers}</Text>
        <Text style={styles.descriptionStyle}>Forks: {repository.forks}</Text>
        <Text style={styles.descriptionStyle}>Language: {repository.language}</Text>
        <Text style={styles.descriptionStyle}>Default Branch: {repository.defaultBranch}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    padding: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontStyle: 'italic',
    marginBottom: 15,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconText: {
    marginLeft: 5,
  },
  listStyle: {
    alignItems: 'flex-start',
    marginTop: 25,
    maxWidth: '100%',
  },
  descriptionStyle: {
    padding: 3,
    fontWeight: 'bold',
  },
});
