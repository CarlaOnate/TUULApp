/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import {ApolloProvider, InMemoryCache, createHttpLink, ApolloClient} from "@apollo/client";
import SocialSignIn from "./pages/Social-signin";
import Dashboard from "./pages/Dashboard";


const Stack = createStackNavigator();
const cache = new InMemoryCache();
const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});
const client = new ApolloClient({link, cache})

const App = () => {
  return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={SocialSignIn}
                options={{ title: 'Welcome' }}
            />
            <Stack.Screen name="Dashboard" component={Dashboard} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
  );
};

export default App
