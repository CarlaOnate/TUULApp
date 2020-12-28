import React, {useState} from 'react';
import {
    View,
    TouchableOpacity, Modal
} from 'react-native';
import styles from '../styles/modal.styles'
import Map from "../atoms/Modals/Map";
import ButtonAtom from "../atoms/ButtonAtom";
import TextAtom from "../atoms/TextAtom";
import GoogleAutocompleteInputAtom from "../atoms/GoolgeAutocompleteInputAtom";


const AddressModal = ({show, set}) => {
    const [step, setStep] = useState(0)
    const [coordinates, setCoordinates] = useState({lat: '', lng: ''})

    const titles = ['¿Cúal es tu dirección?', 'Confirma tu dirección']

    const CloseModal = () => (
        <TouchableOpacity style={styles.closeButton} onPress={() => {set(!show)}}>
            <TextAtom>Close this shit!</TextAtom>
        </TouchableOpacity>
    )

    const PreviousStep = () => (
        <TouchableOpacity onPress={() => setStep(prev => prev-1)}>
            <TextAtom>
                back
            </TextAtom>
        </TouchableOpacity>
    )

    console.log('steps', step)


    return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={show}>
                <View style={[styles.bottomView, styles.modal]}>
                    <View style={styles.modalView}>

                        <View style={styles.headerContainer}>
                            {step > 0 && <PreviousStep />}
                            <TextAtom>{titles[step]}</TextAtom>
                            <CloseModal />
                        </View>

                        <View>
                            {step === 0 ? (
                                <>
                                    <TextAtom>Tu ubicacion nos permitirá encontrar los veterinarios o clínicas más cercanas.</TextAtom>
                                    <GoogleAutocompleteInputAtom setCoordinates={setCoordinates} setStep={setStep}/>
                                </>
                            ) : (
                                <>
                                    <Map coordinates={coordinates}/>
                                </>
                            )}
                        </View>
                    </View>
                </View>
            <View>
                <ButtonAtom defaultButton>Agregar Dirección</ButtonAtom>
            </View>
            </Modal>
    );
}

export default AddressModal;
