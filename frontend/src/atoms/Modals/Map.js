import React, {useEffect} from 'react';
import {
    View,
    StyleSheet
} from 'react-native'
import MapboxGL from "@react-native-mapbox-gl/maps";

//Default public token
//Todo: Change to our token
MapboxGL.setAccessToken("pk.eyJ1IjoiY2FybGFvIiwiYSI6ImNrNjgyb294aDAwb2Mzbm8ydHhncmJvbWgifQ.07bP1nWOumai4v2tmKYzHA\n");


const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    container: {
        height: '70%',
        width: 300,
        backgroundColor: "tomato"
    },
    map: {
        flex: 1
    }
});


const Map = () => {
    useEffect(() => {
        MapboxGL.setTelemetryEnabled(false);
        MapboxGL.locationManager.start();

        return (): void => {
            MapboxGL.locationManager.stop();
        };
    }, [])
    console.log('mapbox', MapboxGL)


    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <MapboxGL.MapView style={styles.map}>
                    <MapboxGL.Camera followZoomLevel={5} followUserLocation={true} followUserMode={'normal'}/>
                    <MapboxGL.UserLocation
                        visible={true}
                       showsUserHeadingIndicator={true}/>
                </MapboxGL.MapView>
            </View>
        </View>
    );
}

export default Map;
