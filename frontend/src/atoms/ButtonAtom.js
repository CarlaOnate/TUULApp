import React from 'react';
import {
    Pressable,
    Button
} from 'react-native'
import styles from '../styles/general.styles'
import TextAtom from "./TextAtom";

const ButtonAtom = ({defaultButton, onPress, children}) => {
    if(defaultButton) return (
        //Todo: Add default button styles - maybe no text, only styles
        <Button
            title="Agrear Direccion"
            color="#841584"
            accessibilityLabel="Agrear tu direccion"
        />
    )

    return (
        <Pressable styles={styles.button} onPress={onPress}>
            <TextAtom>{children}</TextAtom>
        </Pressable>
    );
}

export default ButtonAtom;
