/**
 * @format
 * @flow strict-local
 */

import React, {useContext, useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, StatusBar} from 'react-native';
import styles from '../styles/dashboard.styles';
import LongButton from '../atoms/db_longButton/db_longButtonAtom';
import ShortButton from '../atoms/db_shortButton/db_shortButtonAtom';
import ModalMolecule from '../molecules/ModalMolecule';
import Map from '../atoms/Modals/Map';
import userContext from '../contexts/userContext';

const Dashboard = ({navigation}) => {
  const user = useContext(userContext);
  console.log('user ctx', user);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user.address) {
      setShowModal(true);
    }
  }, [user.address]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View styler={styles.dashboardContainer}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginLeft: 10,
                marginRight: 10,
                marginTop: 10,
              }}>
              <ShortButton
                text={'Vet a Domicilio'}
                backgroundColor={'#163D64'}
                onPress={() => navigation.navigate('Veterinarios')}
              />
              <ShortButton text={'Clínicas'} backgroundColor={'#50AFD2'} />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginLeft: 10,
                marginRight: 10,
              }}>
              <ShortButton text={'Estética'} backgroundColor={'#307398'} />
              <ShortButton text={'Paseos'} backgroundColor={'#7CD1EB'} />
            </View>
            <LongButton
              text={'Emergencias'}
              // TODO: ••• Image has height but is not displayable
              backgroundColor={'#d83910'}
            />
            <LongButton
              text={'Pensión'}
              // TODO: ••• Image has height but is not displayable
              backgroundColor={'#E87A30'}
            />
            <LongButton
              text={'Adopciones'}
              // TODO: ••• Image has height but is not displayable
              backgroundColor={'#EAB254'}
            />
          </View>
          <View />
          {showModal && (
            <ModalMolecule showState={{show: showModal, set: setShowModal}}>
              <Map />
            </ModalMolecule>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Dashboard;
