/**
 * @format
 * @flow strict-local
 */

import React, {useContext, useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, StatusBar} from 'react-native';
import styles from '../styles/dashboard.styles';
import LongButton from '../atoms/db_longButton/db_longButtonAtom';
import CardAtom from '../atoms/Dashboard/CardAtom';
import ModalMolecule from '../molecules/ModalMolecule';
import Map from '../atoms/Modals/Map';
import phoneImage from '../images/phone.png';
import userContext from '../contexts/userContext';

const Dashboard = () => {
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
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View styler={styles.dashboardContainer}>
            <CardAtom style={[styles.cardVet]} text={'Vets a Domicilio'} />
            <LongButton
              text={'Emergencias'}
              image={{
                uri:
                  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages6.moneysavingexpert.com%2Fimages%2Fimg-telephone-transparent.png&f=1&nofb=1',
              }}
              backgroundColor={'#d83910'}
            />
          </View>
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
