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

import userContext from "../contexts/userContext";
import AddressModal from "../organisms/AddressModal";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import GoogleAutocompleteInputAtom from "../atoms/GoolgeAutocompleteInputAtom";

const Dashboard = () => {
    const modalHeader = '¿Cuál es tu dirección?'
    const user = useContext(userContext)
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
                    keyboardShouldPersistTaps='always'
                    style={styles.scrollView}>
                    <View style={styles.dashboardContainer}>
                        <CardAtom  style={[styles.cardVet]} text={'Vets a Domicilio'} />
                        <CardAtom style={styles.cardClinic} text={'Vets a as'} />
                        <CardAtom style={styles.cardPension} text={'Vets a asdf'} />
                        <CardAtom style={styles.cardVet} text={'Vets a asdf'} />
                    </View>
                    {showModal && (
                        <ModalMolecule header={modalHeader} showState={{show: showModal, set: setShowModal}}>
                            <AddressModal />
                        </ModalMolecule>
                    )}
                </ScrollView>
            </SafeAreaView>
        </>
    );
};


export default Dashboard;
