import React, {useState} from 'react';
import {
    View
} from 'react-native';
import styles from '../styles/modal.styles'
import Map from "../atoms/Modals/Map";
import ButtonAtom from "../atoms/ButtonAtom";
import TextAtom from "../atoms/TextAtom";
import GoogleAutocompleteInputAtom from "../atoms/GoolgeAutocompleteInputAtom";


const AddressModal = () => {
    const [step, setStep] = useState(0)
    const [coordinates, setCoordinates] = useState({lat: '', lon: ''})

    return (
        <View styles={styles.addressModal}>
                {step === 0 ? (
                    <>
                        <TextAtom>Tu ubicacion nos permitirá encontrar los veterinarios o clínicas más cercanas.</TextAtom>
                        <GoogleAutocompleteInputAtom setCoordinates={setCoordinates}/>
                    </>
                ) : (
                    <>
                        <Map coordinates={coordinates}/>
                        <TextAtom>Direccion que puso el user</TextAtom>
                    </>
                )}
            <View styles={styles.addressModal}>
                <ButtonAtom defaultButton>Agregar Dirección</ButtonAtom>
            </View>
        </View>
    );
}

export default AddressModal;
