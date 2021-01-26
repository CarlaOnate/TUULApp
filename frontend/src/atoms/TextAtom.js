import React from 'react';
import {Text} from 'react-native';

function TextAtom({style, children}) {
    return (<Text style={style}>{children}</Text>)
}

export default TextAtom;
