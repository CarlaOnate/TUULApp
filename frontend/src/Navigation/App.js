/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import * as React from 'react';
import {useContext} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import Dashboard from '../pages/Dashboard';
import Vets from '../pages/Vets';
import Signup from '../pages/Signup';
import NavigationHeader from '../atoms/NavigationHeader';

import {
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  ApolloClient,
  ApolloLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import userContext from '../contexts/userContext';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
const cache = new InMemoryCache();
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const App = () => {
  const ctx = useContext(userContext);

  const contextLink = setContext((_, {headers}) => {
    return {
      headers: {
        ...headers,
        user: ctx.user.id,
      },
    };
  });

  const client = new ApolloClient({
    link: contextLink.concat(httpLink),
    cache,
    credentials: 'same-origin',
  });

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{}}>
          <Stack.Screen
            name="Login"
            component={Signup}
            options={{
              headerTitle: props => <NavigationHeader {...props} />,
              headerStyle: {
                backgroundColor: 'rgb(76, 156, 236)',
              },
            }}
          />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Veterinarios" component={Vets} />
        </Stack.Navigator>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              if (route.name === 'Dashboard') {
                return (
                  <MaterialIcons name="dashboard" color={color} size={size} />
                );
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: 'orange',
            inactiveTintColor: 'blue',
          }}>
          <Tab.Screen name="Dashboard" component={Dashboard} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
