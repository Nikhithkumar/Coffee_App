import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS } from '../theme/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SplashScreens = ({ navigation }: any) => {

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const data = await AsyncStorage.getItem('MobileNo')
        console.log("data===>", data)
        if (data) {
            navigation.push('TabBar')
        }
        else {
            navigation.push('ScreenOne')
        }
    }

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1,backgroundColor:COLORS.primaryBlackHex }}>
            <ActivityIndicator animating={true} size={'large'} color={COLORS.primaryOrangeHex} />
        </View>
    )
}

export default SplashScreens

