/**
 * @format
 * @flow strict-local
 */

import React, {useContext} from 'react';
import {gql, useQuery} from '@apollo/client';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
import userContext from '../Contexts/userContext';

const GET_USER = gql`
  query getCurrentUser {
    currentUser {
      name
      id
      profilePhoto
    }
  }
`;

const Home = () => {
  const context = useContext(userContext);
  console.log('context in home', context);
  //Todo: data is undefined for some reason, in localhost 4000 works fine
  //eslint-disable-next-line no-unused-vars
  const {data, loading, error} = useQuery(GET_USER);

  if (error) {
    console.log('error', error);
    return <Text>Algo salió mal</Text>;
  }

  console.log('currentUser', data);

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
            {/*{data && <Text>{data.currentUser}</Text>}*/}
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
    width: 400,
  },
});

export default Home;
