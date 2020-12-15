/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useContext} from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    StatusBar,
} from 'react-native';

import { Header,} from 'react-native/Libraries/NewAppScreen';
import styles from '../styles/social-signin.styles'

import userContext from '../contexts/userContext'
import { gql, useMutation } from '@apollo/client';

import GoogleSigninComponent from "../atoms/auth/Google-singin";

//create user mutation
const LOGIN_USER = gql`
    mutation loginUser($input: GoogleUserInput!) {
        loginUser(input: $input) {
            id,
            name,
            lastname,
            profilePhoto
        }
    }
`;


const SocialSignIn = ({navigation}) => {
    const [error, setError] = useState()

    const context = useContext(userContext)
    const [loginUser, {data, error: userError}] = useMutation(LOGIN_USER)


    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <Header />
                    <View style={styles.body}>
                        <GoogleSigninComponent
                            navigation={navigation}
                            errorState={{error, setError}}
                            context={context}
                            loginUser={loginUser}
                            loginUserResponse={{data, userError}} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};


export default SocialSignIn;
