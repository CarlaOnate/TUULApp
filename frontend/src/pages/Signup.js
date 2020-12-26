import React from 'react';
import {
    SafeAreaView, ScrollView, StatusBar, View,
} from 'react-native';
import styles from "../styles/social-signin.styles";
import SocialSignIn from "../organisms/Social-signin";
import TextAtom from "../atoms/TextAtom";

function Signup({navigation}) {
    return (
        <SafeAreaView>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic">
                <StatusBar barStyle="dark-content" />
                <View styles={styles.signupContainer}>
                    <View style={styles.welcomeStyle}>
                        <TextAtom type='h1'>¡Bienvenido!</TextAtom>
                    </View>
                    <SocialSignIn navigation={navigation}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Signup;
