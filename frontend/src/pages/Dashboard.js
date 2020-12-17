/**
 * @format
 * @flow strict-local
 */

import React, {useContext, useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    StatusBar,
} from 'react-native';
import styles from '../styles/dashboard.styles'
import CardAtom from "../atoms/Dashboard/CardAtom";
import ModalMolecule from '../molecules/ModalMolecule'
import Map from '../atoms/Modals/Map'

import userContext from "../contexts/userContext";

const Dashboard = () => {
    const user = useContext(userContext)
    console.log('user ctx', user)
    const [showModal, setShowModal] = useState(false)


    useEffect(() => {
        if(!user.address){
            setShowModal(true)
        }
    }, [])

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <View style={styles.dashboardContainer}>
                        <CardAtom  style={[styles.cardVet]} text={'Vets a Domicilio'} />
                        <CardAtom style={styles.cardClinic} text={'Vets a as'} />
                        <CardAtom style={styles.cardPension} text={'Vets a asdf'} />
                        <CardAtom style={styles.cardVet} text={'Vets a asdf'} />
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
