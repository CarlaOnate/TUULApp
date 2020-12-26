import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './db_shortButtonAtom.styles';

function ShortButtonAtom({text, image, backgroundColor, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.Button, backgroundColor && {backgroundColor}]}>
      <View>
        <Text style={styles.InnerText}>{text}</Text>
        <Image style={styles.Image} source={image} />
      </View>
    </TouchableOpacity>
  );
}

export default ShortButtonAtom;
