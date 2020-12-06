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
import userContext from '../Contexts/userContext'
import { gql, useMutation } from '@apollo/client';

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


const App = ({navigation}) => {
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
      navigation.navigate('Home')
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
          onPress={() => navigation.navigate('Home')}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  webView: {
    height: 600,
    width: 400
  }
});

export default App;
