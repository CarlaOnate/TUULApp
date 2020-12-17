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

import Dashboard from "../pages/Dashboard";
import Signup from "../pages/Signup";
import NavigationHeader from '../atoms/NavigationHeader'

import {ApolloProvider, InMemoryCache, createHttpLink, ApolloClient, ApolloLink} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import userContext from "../contexts/userContext";

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
          <Stack.Navigator
            screenOptions={{}}
          >
            <Stack.Screen
                name="Login"
                component={Signup}
                options={{
                    headerTitle: props => <NavigationHeader {...props}/>,
                    headerStyle: {
                        backgroundColor: 'rgb(76, 156, 236)'
                }}}
            />
            <Stack.Screen name="Dashboard" component={Dashboard} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
  );
};

export default App
