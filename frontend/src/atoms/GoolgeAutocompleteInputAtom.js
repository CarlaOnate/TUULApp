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

const GoogleAutocompleteInputAtom = ({setCoordinates, setStep, setAddress}) => {

    const {data, loading, error} = useQuery(GET_ENV_VAR, {variables: {variable: 'GOOGLE_API_KEY'}})
    data && Geocoder.init(data.env); // use a valid API key


    if(error) return <TextAtom>Alog salió mal</TextAtom>
    if(loading) return <TextAtom>Spinner...</TextAtom>

    return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={async (data, details = null) => {
                const {results} = await Geocoder.from(data.description)
                const coordinates = results[0].geometry.location
                setCoordinates({lat: coordinates.lat, lng: coordinates.lng})
                //Setting address
                console.log(results)
                let street, number, neighbourhood, city, state, zipCode
                results[0].address_components.map(el => {
                    const {types} = el
                        if(types.includes('street_number')){
                            number = el.short_name
                        } else if (types.includes('route')){
                            street = el.short_name
                        } else if (types.includes('sublocality')){
                            neighbourhood = el.short_name
                        } else if (types.includes('administrative_area_level_1')){
                            //Todo: Check which code is for state and which is for city
                            if(!state){
                                state = el.long_name
                            }
                        } else if (types.includes('postal_code')){
                            zipCode = el.short_name
                        }
                })

                setAddress({
                    street,
                    number,
                    neighbourhood,
                    state,
                    zipCode
                })

                setStep(1)
            }}
            fetchDetails={true}
            query={{
                key: data.env,
                language: 'es',
                components: 'country:mx'
            }}
            styles={{
                textInput: {
                    width: '100%'
                },
            }}
        />
    );
}

export default GoogleAutocompleteInputAtom;
