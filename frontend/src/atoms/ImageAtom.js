import React from 'react';
import {
    Image
} from 'react-native';


const ImageAtom = () => {
    return (
        <Image
            style={{ width: 50, height: 50 }}
            source={require('../assets/tuul-graphic.png')}
        />
    );
}

export default ImageAtom;
