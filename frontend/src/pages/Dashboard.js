/**
 * @format
 * @flow strict-local
 */



import React, {useContext} from 'react';
import { gql, useQuery } from '@apollo/client';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import styles from '../styles/dashboard.styles'

import userContext from "../contexts/userContext";


const GET_USER = gql`
    query getCurrentUser{
        currentUser {
            id
        }
    }
`

const Dashboard = () => {
    const context = useContext(userContext)
    console.log('context in home', context)
    const {data, loading, error} = useQuery(GET_USER)

    if(error) {
        console.log('error', error)
        return <Text>Algo salió mal</Text>
    }

    console.log('currentUser', data)

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <Header />
                    <View style={styles.body}>
                        <Text>YA ESTAS EN EL HOME! YA TE LOGGEASTE</Text>
                        <Text>{context.user.name}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};


export default Dashboard;
