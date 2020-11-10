import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import App from './pages/App'
import Home from './pages/Home'
import {ApolloProvider, InMemoryCache, createHttpLink, ApolloClient} from "@apollo/client";

const Stack = createStackNavigator();
const cache = new InMemoryCache();
const link = createHttpLink({
    uri: 'http://localhost:4000/graphql',
});
const client = new ApolloClient({link, cache})

const Navigation = () => {
    return (
    <ApolloProvider client={client}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="App"
                    component={App}
                    options={{ title: 'Welcome' }}
                />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    </ApolloProvider>
    );
};

export default Navigation
