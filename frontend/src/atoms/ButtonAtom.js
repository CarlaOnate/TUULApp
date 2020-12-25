import React from 'react';
import {
    TouchableOpacity,
    Button
} from 'react-native'
import styles from '../styles/general.styles'
import TextAtom from "./TextAtom";

const ButtonAtom = ({defaultButton, children}) => {
    if(defaultButton) return (
        <Button
            title="Agrear Direccion"
            color="#841584"
            accessibilityLabel="Agrear tu direccion"
        />
    )

    return (
        <TouchableOpacity styles={styles.button}>
            <TextAtom>{children}</TextAtom>
        </TouchableOpacity>
    );
}

export default ButtonAtom;
