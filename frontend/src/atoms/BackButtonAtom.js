import React from 'react';
import {
    Button
} from 'react-native';

function BackButtonAtom({type, text, navigation}) {
    return (
        <Button title={text}/>
    );
}

export default BackButtonAtom;
