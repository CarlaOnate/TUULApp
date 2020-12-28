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
    const [coordinates, setCoordinates] = useState({lat: '', lng: ''})

    console.log('coordinates', coordinates)

    return (
        <View>
                {step === 0 ? (
                    <>
                        <TextAtom>Tu ubicacion nos permitirá encontrar los veterinarios o clínicas más cercanas.</TextAtom>
                        <GoogleAutocompleteInputAtom setCoordinates={setCoordinates} setStep={setStep}/>
                    </>
                ) : (
                    <>
                        <Map coordinates={coordinates}/>
                        <TextAtom>Direccion que puso el user</TextAtom>
                    </>
                )}
            <View>
                <ButtonAtom defaultButton>Agregar Dirección</ButtonAtom>
            </View>
        </View>
    );
}

export default AddressModal;
