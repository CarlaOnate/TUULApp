import React from 'react';
import {
    Modal,
    TouchableOpacity,
    View
} from 'react-native';
import TextAtom from "../atoms/TextAtom";
import styles from '../styles/modal.styles'
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import GoogleAutocompleteInputAtom from "../atoms/GoolgeAutocompleteInputAtom";


//Todo: Styles genericos


const ModalMolecule = ({showState, header, children}) => {
    const {show, set} = showState
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={show}>
            <View style={[styles.bottomView, styles.modal]}>
                <View style={styles.modalView}>
                    <View style={styles.headerContainer}>
                        <TextAtom>{header}</TextAtom>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => {set(!show);}}>
                            <TextAtom>Close this shit!</TextAtom>
                        </TouchableOpacity>
                    </View>
                    {children}
                </View>
            </View>
        </Modal>
    );
}

export default ModalMolecule;
