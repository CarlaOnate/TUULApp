/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
    View,
} from 'react-native';
import styles from '../../styles/social-signin.styles'



import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

const GoogleButton = ({navigation, errorState, context, loginUser, loginUserResponse}) => {
    const {data, userError} = loginUserResponse
    const {error, setError} = errorState

    const [googleLoading, setGoogleLoading] = useState(false)

    GoogleSignin.configure();

    const loginResponse = () => {
        if(data){
            context.setUser(JSON.parse(data.loginUser)[0])
            console.log('before navigation')
            navigation.navigate('Dashboard')
        }
    }

    useEffect(loginResponse ,[data, userError])

    const signInGoogle = async () => {
        console.log('signin google')
        try {
            error && setError(userError.message)
            setGoogleLoading(false)

            const playServices = await GoogleSignin.hasPlayServices();
            console.log(playServices)
            const {idToken, user: {email, id: googleId, photo, name}} = await GoogleSignin.signIn();
            console.log('google info', email, googleId)
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
                console.log('In-progress')
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
        <View style={styles.sectionContainer}>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signInGoogle}
                disabled={googleLoading} />
        </View>
        </>
    );
};


export default GoogleButton;
