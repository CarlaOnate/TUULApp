import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet
} from 'react-native'
import MapboxGL from "@react-native-mapbox-gl/maps";
import Geolocation from 'react-native-geolocation-service';

//Default public token
//Todo: Change to our token
MapboxGL.setAccessToken("pk.eyJ1IjoiY2FybGFvIiwiYSI6ImNrNjgyb294aDAwb2Mzbm8ydHhncmJvbWgifQ.07bP1nWOumai4v2tmKYzHA\n");


const styles = StyleSheet.create({
    page: {
        width: 200,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    container: {
        height: 200,
        width: 300,
        backgroundColor: "tomato"
    },
    map: {
        flex: 1
    }
});


const Map = ({coordinates}) => {

    useEffect(() => {
        MapboxGL.setTelemetryEnabled(false);
    }, [])

    useEffect(() => {
        const center = async () => {
            await MapboxGL.getPointInView([coordinates.lat, coordinates.lng]);
        }
        center()
    }, [coordinates])



    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <MapboxGL.MapView style={styles.map}>
                    <MapboxGL.MarkerView coordinate={[coordinates.lng, coordinates.lat]}/>
                    <MapboxGL.Camera zoomLevel={15} centerCoordinate={[coordinates.lng, coordinates.lat]}/>
                </MapboxGL.MapView>
            </View>
        </View>
    );
}

export default Map;
