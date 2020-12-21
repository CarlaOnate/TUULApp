import React, {useEffect} from 'react';
import {
    View
} from 'react-native'
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken("<YOUR_ACCESSTOKEN>");
MapboxGL.setConnected(true);

useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
}, [])


const Map = () => {
    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <MapboxGL.MapView style={styles.map} />
            </View>
        </View>
    );
}

export default Map;
