import { Dimensions, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme'
import { TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage'

const w = Dimensions.get('window').width

const DrawerContent = ({ navigation }: any) => {
    const value = useSharedValue(0)
    const [visible, setVisible] = useState(false)

    const heightStyle = useAnimatedStyle(() => {
        const marginTop = interpolate(
            value.value,
            [0, 1],
            [-15, 0]
        )
        const paddingBottom = interpolate(
            value.value,
            [0, 1],
            [15, 0]
        )
        return {
            marginTop, paddingBottom
        }
    })

    const innerStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            value.value, [0, 1], [12, 16]
        )
        return { borderRadius }
    })

    const handlePress = () => {
        'worklet';

        value.value = withTiming(1, {
            duration: 100
        })
        setTimeout(() => {
            setVisible(true);
        }, 300)
    }

    const onButtonUp = () => {
        value.value = withTiming(0, {
            duration: 50
        })
    }

    const handleClose = async () => {
        const MobileNo = await AsyncStorage.getItem('MobileNo')
        console.log("Mobile No===>", MobileNo)
        if (MobileNo) {
            setVisible(!visible);
            await AsyncStorage.removeItem('MobileNo')
            navigation.navigate('ScreenOne')
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.TextHeading}>Nikhith Kumar</Text>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('TabBar')}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.btn}
                        colors={[COLORS.primaryBlackHex, COLORS.primaryGreyHex]}>
                        <Text style={styles.TextHeading}>Home</Text>
                    </LinearGradient>
                </TouchableOpacity >
                <TouchableOpacity >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.btn}
                        colors={[COLORS.primaryBlackHex, COLORS.primaryGreyHex]}>
                        <Text style={styles.TextHeading}>Calendar</Text>
                    </LinearGradient>
                </TouchableOpacity >
                <TouchableOpacity >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.btn}
                        colors={[COLORS.primaryBlackHex, COLORS.primaryGreyHex]}>
                        <Text style={styles.TextHeading}>My Profile</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MovieTabNavigation')}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.btn}
                        colors={[COLORS.primaryBlackHex, COLORS.primaryGreyHex]}>
                        <Text style={styles.TextHeading}>Buy Movie Ticket</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Maps')}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.btn}
                        colors={[COLORS.primaryBlackHex, COLORS.primaryGreyHex]}>
                        <Text style={styles.TextHeading}>Meetins Rooms</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.btn}
                        colors={[COLORS.primaryBlackHex, COLORS.primaryGreyHex]}>
                        <Text style={styles.TextHeading}>Settings</Text>
                    </LinearGradient>
                </TouchableOpacity>


            </View>
            <TouchableWithoutFeedback onPressIn={handlePress} onPressOut={onButtonUp}>
                <View style={styles.outer}>
                    <Animated.View style={[styles.height, heightStyle]}>
                        <Animated.View style={[styles.inner, innerStyle]}>
                            <Text style={styles.white}>Logout</Text>
                        </Animated.View>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
            <Modal visible={visible} transparent={true} animationType='fade'>
                <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }} >
                        <View style={{ width: w - 60, height: 120, borderRadius: 20, paddingVertical: 20, backgroundColor: COLORS.primaryWhiteHex, alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, color: 'black', fontWeight: '800' }}>Are you sure you want to log out.</Text>
                            <View style={{ flexDirection: 'row', width: w - 60, justifyContent: 'flex-end' }}>
                                <TouchableOpacity style={{
                                    backgroundColor: COLORS.primaryOrangeHex, width: 60, height: 30, borderRadius: 10,
                                    alignItems: 'center', justifyContent: 'center', alignSelf: 'center'
                                }} onPress={() => setVisible(false)}>
                                    <Text style={{ textAlign: 'right', fontWeight: 'bold', color: COLORS.primaryWhiteHex }}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    backgroundColor: COLORS.primaryOrangeHex, width: 60, height: 30,
                                    borderRadius: 10, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginHorizontal: 20
                                }} onPress={handleClose}>
                                    <Text style={{ textAlign: 'right', fontWeight: 'bold', color: COLORS.primaryWhiteHex }}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: COLORS.primaryBlackHex, borderRadius: 10, borderColor: COLORS.primaryWhiteHex,
        borderWidth: 1, paddingHorizontal: 20, paddingTop: 50
    },
    TextHeading: {
        fontSize: FONTSIZE.size_20, fontFamily: FONTFAMILY.poppins_semibold, color: COLORS.primaryWhiteHex,
        textAlign: 'center'
    },
    btn: {
        width: '90%',
        height: 40,
        alignItems: 'flex-start',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: COLORS.primaryWhiteHex,
        marginVertical: 10, paddingLeft: 10,
        shadowOpacity: 5,
        shadowRadius: 3.25,
        shadowOffset: {
            height: 2,
            width: 2
        },
        shadowColor: COLORS.primaryGreyHex,
        elevation: 2,
        justifyContent:'center'
    },
    outer: {
        padding: 10,
        borderRadius: 14,
        height: 60,
        width: 150,
        marginTop: 'auto',
        alignItems: 'center',
        marginBottom: 30
    },
    inner: {
        backgroundColor: COLORS.primaryOrangeHex, width: 120,
        alignItems: "center", justifyContent: "center", height: 50
    },
    white: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 20,
    },
    height: {
        borderRadius: 16,
        backgroundColor: "rgba(255, 0, 0, .5)"
    }
})