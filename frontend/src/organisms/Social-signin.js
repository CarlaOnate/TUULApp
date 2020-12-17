/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useContext} from 'react';
import {
    View,
} from 'react-native';
import styles from '../styles/social-signin.styles'

import userContext from '../contexts/userContext'
import { gql, useMutation } from '@apollo/client';

import ImageAtom from "../atoms/ImageAtom";
import GoogleButton from "../atoms/auth/GoogleButton";

//create user mutation
const LOGIN_USER = gql`
    mutation loginUser($input: GoogleUserInput!) {
        loginUser(input: $input)
    }
`;


const SocialSignIn = ({navigation}) => {
    const [error, setError] = useState()
    const context = useContext(userContext)
    const [loginUser, {data, error: userError}] = useMutation(LOGIN_USER)

    return (
        <>
            <View>
                <ImageAtom />
                <GoogleButton
                    navigation={navigation}
                    errorState={{error, setError}}
                    context={context}
                    loginUser={loginUser}
                    loginUserResponse={{data, userError}} />
            </View>
        </>
    );
};


export default SocialSignIn;
