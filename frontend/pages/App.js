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


import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import userContext from '../Contexts/userContext'
import { gql, useMutation, useLazyQuery } from '@apollo/client';

//check user query
const CHECK_USER = gql`
    query checkUserLogin($email: String){
      checkUserLogin(email: $email)
    }
`

//login user query
const LOGIN_USER = gql`
  query loginUser($email: String) {
    loginUser(email: $email) {
      name
    }
  }
`;

//create user mutation
const CREATE_USER = gql`
  mutation createUser($input: GoogleUserInput!) {
    createUser(input: $input) {
      name
    }
  }
`;


const App = ({navigation}) => {
  const [error, setError] = useState()

  const context = useContext(userContext)
  const [logUser, {data: user, error: userError}] = useLazyQuery(LOGIN_USER)
  const [createUser, {data: newUser, error: createError}] = useMutation(CREATE_USER)
  const [checkUser, {data: checkedUser, error: checkError}] = useLazyQuery(CHECK_USER)

  if(userError || createError || checkError){
    setError(userError ? userError.message : createError ? createError.message : checkError.message)
  }

  GoogleSignin.configure();

  const signInGoogle = async () => {
    try {

      await GoogleSignin.hasPlayServices();
      const {idToken, user: {email, id: googleId, photo, name}} = await GoogleSignin.signIn();

      await checkUser({variables: email})
      if(checkedUser){
        await logUser({variables: {
          email
        }})
      } else {
        await createUser({variables: {
          input: {
            idToken,
            googleAccount: {
              email,
              name,
              photo,
              googleId
            }
          }
          }})
      }
      context.setUser(checkUser ? user : newUser)
      navigation.navigate('Home')

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        setError('Google Play Services no están disponibles')
      } else {
        // some other error happened
        setError('Hubo un error')
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
              />
            </View>
            {error && (<Text>{error}</Text>)}
          </View>
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
