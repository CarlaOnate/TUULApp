import React from 'react';
import {
    Modal,
    TouchableOpacity,
    View
} from 'react-native';
import TextAtom from "../atoms/TextAtom";
import styles from '../styles/modal.styles'


//Todo: Styles genericos


const ModalMolecule = ({showState, children}) => {
    const {show, set} = showState
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={show}>
            <View style={[styles.bottomView, styles.modal]}>
                <View style={styles.modalView}>
                    <View style={styles.closeContainer}>
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
