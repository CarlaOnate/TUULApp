import React from 'react';
import {Text} from 'react-native';
import styles from '../styles/TextAtom.styles'

function TextAtom({type, children}) {
    if(type === 'h1') {
        return (<Text style={styles.h1}>{children}</Text>);
    }
    return (<Text>{children}</Text>)
}

export default TextAtom;
