import React from 'react';
import {Text} from 'react-native';
import styles from './heading.styles'

function TextAtom({type, bold, children}) {
    if(type === 'h1') {
        return (<Text style={bold ? [styles.h1, styles.bold] : [styles.h1]}>{children}</Text>);
    } else if (type === 'h2'){
        return (<Text style={bold ? [styles.h2, styles.bold] : [styles.h2]}>{children}</Text>);
    } else {
        return (<Text style={bold ? [styles.h3, styles.bold] : [styles.h3]}>{children}</Text>);
    }
}

export default TextAtom;
