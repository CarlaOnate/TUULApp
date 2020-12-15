/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import 'react-native-gesture-handler';

import * as React from 'react';
import {useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import {ApolloProvider, InMemoryCache, createHttpLink, ApolloClient, ApolloLink} from "@apollo/client";
import SocialSignIn from "./src/pages/Social-signin";
import Dashboard from "./src/pages/Dashboard";
import { setContext } from "@apollo/client/link/context";
import userContext from "./Contexts/userContext";

const Stack = createStackNavigator();

const cache = new InMemoryCache();

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
})


const App = () => {
    const ctx = useContext(userContext)

    const contextLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                user: ctx.user.id
            }
        }
    })

    const client = new ApolloClient({
        link: contextLink.concat(httpLink),
        cache,
        credentials: 'same-origin'
    })


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
