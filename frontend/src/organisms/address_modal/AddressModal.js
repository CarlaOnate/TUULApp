import React, {useState} from 'react';
import {
    View,
    TouchableOpacity, Modal
} from 'react-native';
import stylesModal from '../../styles/modal.styles'
import styles from './addressModal.styles'

import Map from "../../atoms/Modals/Map";
import ButtonAtom from "../../atoms/ButtonAtom";
import TextAtom from "../../atoms/TextAtom";
import HeadingAtom from '../../atoms/heading_atom/HeadingAtom'
import GoogleAutocompleteInputAtom from "../../atoms/GoolgeAutocompleteInputAtom";
import {gql, useMutation} from '@apollo/client';

const ADD_ADDRESS = gql`
    mutation addAddress($input: AddressInput){
        addAddress(input: $input)
    }
`

const AddressModal = ({show, set}) => {
    const [step, setStep] = useState(0)
    const [coordinates, setCoordinates] = useState({lat: '', lng: ''})
    const [address, setAddress] = useState({
        street: '',
        number: '',
        neighbourhood: '',
        city: '',
        state: '',
        zipCode: ''
    })

    const [addAddress, {data}] = useMutation(ADD_ADDRESS)


    const titles = ['¿Cúal es tu dirección?', 'Confirma tu dirección']

    const CloseModal = () => (
        <TouchableOpacity style={styles.closeButton} onPress={() => {set(!show)}}>
            <TextAtom>X</TextAtom>
        </TouchableOpacity>
    )

    const PreviousStep = () => (
        <TouchableOpacity onPress={() => setStep(prev => prev-1)}>
            <TextAtom>
                back
            </TextAtom>
        </TouchableOpacity>
    )

    const submitAddress = async () => {
        await addAddress({variables: {
            input: address
        }})
        if(data) set(!show)
    }


    return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={show}>
                <View style={[stylesModal.bottomView, stylesModal.modal]}>
                    <View style={stylesModal.modalView}>

                        <View style={stylesModal.headerContainer}>
                            {step > 0 && <PreviousStep />}
                            <HeadingAtom type={'h1'}>{titles[step]}</HeadingAtom>
                            <CloseModal />
                        </View>

                        <View>
                            {step === 0 ? (
                                <>
                                    <TextAtom style={styles.mainText}>Tu ubicacion nos permitirá encontrar los veterinarios o clínicas más cercanas.</TextAtom>
                                    <GoogleAutocompleteInputAtom setCoordinates={setCoordinates} setStep={setStep} setAddress={setAddress}/>
                                </>
                            ) : (
                                <>
                                    <Map coordinates={coordinates}/>
                                    <View style={styles.modalButton}>
                                        <ButtonAtom onPress={submitAddress}>Agregar Dirección</ButtonAtom>
                                    </View>
                                </>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
    );
}

export default AddressModal;
