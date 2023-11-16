import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import PaymentScreen from '../screens/PaymentScreen'
import DetailsScreen from '../screens/DetailsScreen'
import TabNavigation from '../navigator/TabNavigation'
import Tabs from '../navigator/tabs'
import ScreenOne from '../screens/ScreenOne'
import ScreenTwo from '../screens/ScreenTwo'
import Profile from '../screens/Profile';
import SplashScreens from '../screens/SplashScreen'
import Maps from '../screens/Maps'
import MovieTabNavigation from './MovieTabNavigation'
import SeatBookingScreen from '../screens/MovieScreen/SeatBookingScreen'
import MovieDetailsScreen from '../screens/MovieScreen/MovieDetailsScreen'

const Stack = createNativeStackNavigator()

const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='SplashScreens'>
            <Stack.Screen name='SplashScreens' component={SplashScreens} options={{ animation: 'fade_from_bottom' }}></Stack.Screen>
            <Stack.Screen name="TabBar" component={TabNavigation}></Stack.Screen>
            <Stack.Screen name="MovieTabNavigation" component={MovieTabNavigation}></Stack.Screen>
            <Stack.Screen name="SeatBookingScreen" component={SeatBookingScreen} options={{ animation: 'fade_from_bottom' }}></Stack.Screen>
            <Stack.Screen name="MovieDetailsScreen" component={MovieDetailsScreen} options={{ animation: 'fade_from_bottom' }}></Stack.Screen>
            <Stack.Screen name='ScreenOne' component={ScreenOne} options={{ animation: 'fade_from_bottom' }}></Stack.Screen>
            <Stack.Screen name='Maps' component={Maps} options={{ animation: 'fade_from_bottom' }}></Stack.Screen>
            <Stack.Screen name='ScreenTwo' component={ScreenTwo} options={{ animation: 'fade_from_bottom' }}></Stack.Screen>
            <Stack.Screen name='Details' component={DetailsScreen} options={{ animation: 'fade_from_bottom' }}></Stack.Screen>
            <Stack.Screen name='Profile' component={Profile} options={{ animation: 'fade_from_bottom' }}></Stack.Screen>
            <Stack.Screen name='PaymentScreen' component={PaymentScreen} options={{ animation: 'fade_from_bottom' }} ></Stack.Screen>
            <Stack.Screen name="Tabs" component={Tabs}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default MainStack

