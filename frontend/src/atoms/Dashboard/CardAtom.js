import React from 'react';
import {
    View,
    TouchableOpacity
} from 'react-native';
import TextAtom from "../TextAtom";
import styles from "../../styles/dashboard.styles";


const CardAtom = ({text, onPress, style}) => {

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.card, style]}>
                <TextAtom>{text}</TextAtom>
            </View>
        </TouchableOpacity>
    );
}

export default CardAtom;
