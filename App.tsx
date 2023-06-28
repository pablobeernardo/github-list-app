import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListUser from './src/pages/components/list-user-component';
import RepositoryList from './src/pages/user-list-repository/list-repositoy';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Usuários GitHub" component={ListUser} />
        <Stack.Screen name="RepositoryList" component={RepositoryList} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
