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

import userContext from "../contexts/userContext";
import AddressModal from "../organisms/AddressModal";

const Dashboard = () => {
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
                        <AddressModal show={showModal} set={setShowModal}/>
                    )}
                </ScrollView>
            </SafeAreaView>
        </>
    );
};


export default Dashboard;
