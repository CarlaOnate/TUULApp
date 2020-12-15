/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useContext, useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button
} from 'react-native';

import {
    Header,
    Colors,
} from 'react-native/Libraries/NewAppScreen';


import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import userContext from '../contexts/userContext'
import { gql, useMutation } from '@apollo/client';
import { setContext } from "apollo-link-context";


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
    const [googleLoading, setGoogleLoading] = useState(false)


    const context = useContext(userContext)
    const [loginUser, {data, error: userError}] = useMutation(LOGIN_USER)

    GoogleSignin.configure();

    const loginResponse = () => {
        console.log('loginRes', data)
        if(data){
            console.log('user', data.loginUser)
            context.setUser(data.loginUser)
            navigation.navigate('Dashboard')
        }
    }

    useEffect(loginResponse ,[data, userError])

    const signInGoogle = async () => {
        try {
            error && setError(userError.message)
            setGoogleLoading(false)

            await GoogleSignin.hasPlayServices();
            const {idToken, user: {email, id: googleId, photo, name}} = await GoogleSignin.signIn();

            console.log(email, name)

            await loginUser({variables: {
                    input: {
                        type: 'google',
                        idToken,
                        googleAccount: {
                            email,
                            name,
                            photo,
                            googleId
                        }
                    }
            }})

        } catch (error) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                setGoogleLoading(false)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
                setGoogleLoading(true)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                setError('Google Play Services no están disponibles')
                setGoogleLoading(false)
            } else {
                // some other error happened
                setError('Hubo un error')
                setGoogleLoading(false)
            }
        }
    };


    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <Header />
                    <View style={styles.body}>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Loggea con Google</Text>
                            <GoogleSigninButton
                                style={{ width: 192, height: 48 }}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Dark}
                                onPress={signInGoogle}
                                disabled={googleLoading} />
                        </View>
                        {error && (<Text>{error}</Text>)}
                    </View>
                    <Button
                        title='Dashboard'
                        onPress={() => navigation.navigate('Dashboard')}
                    />
                </ScrollView>
            </SafeAreaView>
        </>
    );
};


export default SocialSignIn;
