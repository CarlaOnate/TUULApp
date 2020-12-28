import React from 'react';
import Geocoder from 'react-native-geocoding';
import { gql, useQuery } from '@apollo/client';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import TextAtom from "../atoms/TextAtom";
navigator.geolocation = require('react-native-geolocation-service');


const GET_ENV_VAR = gql`
    query get_var($variable: String){
        env(variable: $variable)
    }
`

const GoogleAutocompleteInputAtom = ({setCoordinates, setStep}) => {

    const {data, loading, error} = useQuery(GET_ENV_VAR, {variables: {variable: 'GOOGLE_API_KEY'}})
    data && Geocoder.init(data.env); // use a valid API key


    if(error) return <TextAtom>Alog salió mal</TextAtom>
    if(loading) return <TextAtom>Spinner...</TextAtom>

    return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            currentLocation={true}
            currentLocationLabel={'Ubicación actual'}
            onPress={async (data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data);
                const {results} = await Geocoder.from(data.description)
                const coordinates = results[0].geometry.location
                console.log(results, coordinates.lat, coordinates.lng)
                setCoordinates({lat: coordinates.lat, lng: coordinates.lng})
                setStep(1)
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
            enablePoweredByContainer={true}
        />
    );
}

export default GoogleAutocompleteInputAtom;
