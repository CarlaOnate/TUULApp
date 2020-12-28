import React from 'react';
import {View } from 'react-native'
import { gql, useQuery } from '@apollo/client';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import TextAtom from "../atoms/TextAtom";

const GET_ENV_VAR = gql`
    query get_var($variable: String){
        env(variable: $variable)
    }
`

const GoogleAutocompleteInputAtom = ({setCoordinates}) => {
    const {data, loading, error} = useQuery(GET_ENV_VAR, {variables: {variable: 'GOOGLE_API_KEY'}})

    if(error) return <TextAtom>Alog salió mal</TextAtom>
    if(loading) return <TextAtom>Spinner...</TextAtom>
    console.log('Google autocomplete', data)

    return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            // keyboardShouldPersistTaps={'always'}
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
            }}
            query={{
                key: data.env,
                language: 'es',
                components: 'country:mx'
            }}
            styles={{
                textInput: {
                    width: '100%'
                }
            }}
        />
    );
}

export default GoogleAutocompleteInputAtom;
