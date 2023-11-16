import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Chat from '../components/Chat'
// import MapView from 'react-native-maps';


const Maps = () => {
    return (
        <View style={styles.container}>
            <Chat/>
        </View>
    )
}

export default Maps

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})