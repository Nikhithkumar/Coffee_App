import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    FlatList,
    TouchableWithoutFeedback,
    Modal,
    Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import GradientBGIcon from '../components/GradientBGIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderBar from '../components/HeaderBar';

const SettingsData: any = [
    {
        id: 1,
        name: 'Account',
        Image: require('../assets/app_images/avatar.png'),
        description: ['Privacy', 'security', 'change', 'number'],
    },
    {
        id: 2,
        name: 'Chat',
        Image: require('../assets/app_images/avatar.png'),
        description: ['Chat history', 'theme', 'wallpapers'],
    },
    {
        id: 3,
        name: 'Notifications',
        Image: require('../assets/app_images/avatar.png'),
        description: ['Message', 'group', 'other'],
    },
    {
        id: 4,
        name: 'Help',
        Image: require('../assets/app_images/avatar.png'),
        description: ['Help center', 'contact us', 'privacy policy'],
    },
    {
        id: 5,
        name: 'Storage and data',
        Image: require('../assets/app_images/avatar.png'),
        description: ['Network usage', 'storage usage'],
    },
    {
        id: 6,
        name: 'Invite a friend',
        Image: require('../assets/app_images/avatar.png'),
    },
];

const w=Dimensions.get('screen').width

const Profile = ({ navigation }: any) => {
    const [visible, setVisible] = useState(false)
    const value = useSharedValue(0)

    const handleClose = async () => {
        const MobileNo = await AsyncStorage.getItem('MobileNo')
        console.log("Mobile No===>", MobileNo)
        if (MobileNo) {
            await AsyncStorage.removeItem('MobileNo')
            navigation.navigate('ScreenOne')
        }
    }

    const heightStyle = useAnimatedStyle(() => {
        const marginTop = interpolate(
            value.value,
            [0, 1],
            [-15, 0]
        )
        const paddingBottom = interpolate(
            value.value,
            [0, 1],
            [12, 0]
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
            setVisible(true)
        }, 200)
    }

    const onButtonUp = () => {
        value.value = withTiming(0, {
            duration: 50
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primaryDarkGreyHex }}>
            <HeaderBar title={"Settings"} onPress={() => { }} openProfile={() => navigation.openDrawer()} />
            <View style={{ height: 'auto' }}></View>
            <View style={styles.bottomSheet}>
                <View style={styles.profileDetails}>
                    <TouchableOpacity>
                        <Image
                            source={require('../assets/app_images/avatar.png')}
                            style={{ width: 50, height: 50, alignSelf: 'center', borderRadius: 50 }}
                        />
                    </TouchableOpacity>
                    <Animated.View
                        style={{ paddingLeft: 20, flex: 1 }}>
                        <Text
                            style={{
                                fontFamily: 'Poppins',
                                color: COLORS.primaryWhiteHex,
                                fontSize: 20,
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                            }}>
                            Nikhith Kumar
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'Poppins',
                                color: '#797C7B',
                                fontSize: 12,
                                fontStyle: 'normal',
                                fontWeight: '400',
                            }}>
                            Never give up
                        </Text>
                    </Animated.View>
                    <GradientBGIcon
                        name="menu"
                        color={COLORS.primaryOrangeHex}
                        size={FONTSIZE.size_16}
                    />
                </View>
                <Animated.View>
                    <FlatList
                        data={SettingsData}
                        contentContainerStyle={{ marginTop: 20 }}
                        keyExtractor={key => key.id}
                        renderItem={({ item, index }: any) => (
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                }}>
                                <View style={styles.Container}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                                        style={styles.LinearGradientBG}>
                                    </LinearGradient>
                                </View>
                                <View
                                    style={{ marginLeft: 10, flex: 1, justifyContent: 'center' }}>
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins',
                                            color: COLORS.primaryWhiteHex,
                                            fontSize: 18,
                                            fontStyle: 'normal',
                                            fontWeight: '800',
                                            marginLeft: 10,
                                        }}>
                                        {item.name}
                                    </Text>
                                    <FlatList
                                        data={item.description}
                                        keyExtractor={key => key}
                                        horizontal
                                        renderItem={({ item }: any) => (
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins',
                                                    color: COLORS.secondaryLightGreyHex,
                                                    fontSize: 12,
                                                    fontStyle: 'normal',
                                                    fontWeight: '400',
                                                    marginLeft: 10,
                                                }}>
                                                {item},
                                            </Text>
                                        )}
                                    />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </Animated.View>

                <TouchableWithoutFeedback onPressIn={handlePress} onPressOut={onButtonUp} >
                    <View style={styles.outer}>
                        <Animated.View style={[styles.height, heightStyle]}>
                            <Animated.View style={[styles.inner, innerStyle]}>
                                <Text style={styles.white}>Logout</Text>
                            </Animated.View>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
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
    );
};

export default Profile;

const styles = StyleSheet.create({
    Heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primaryWhiteHex,
        textAlign: 'center',
        fontFamily: 'Poppins',
        marginVertical: 10,
        letterSpacing: 1,
    },
    icon: {
        width: 50,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.20)',
        borderRadius: 50,
        alignSelf: 'flex-start',
    },
    Profileicon: {
        width: 60,
        aspectRatio: 1,
        borderRadius: 50,
        borderWidth: 1,
    },
    bottomSheet: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    profileDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 0.5,
        borderColor: '#F5F6F6',
    },
    LinearGradientBG: {
        height: SPACING.space_24 * 2,
        width: SPACING.space_24 * 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Container: {
        borderWidth: 2,
        borderColor: COLORS.secondaryDarkGreyHex,
        borderRadius: SPACING.space_12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.secondaryDarkGreyHex,
        overflow: 'hidden',
    },
    btn: {
        width: '50%', alignSelf: 'center', height: FONTSIZE.size_20 * 2, alignItems: 'center', justifyContent: 'center',
        borderRadius: BORDERRADIUS.radius_15, backgroundColor: COLORS.primaryOrangeHex, marginTop: 20
    },
    txt: {
        fontSize: FONTSIZE.size_16, color: COLORS.primaryWhiteHex, fontFamily: FONTFAMILY.poppins_medium
    },
    outer: {
        padding: 8,
        borderRadius: BORDERRADIUS.radius_10,
        height: 50,
        width: 150,
        marginTop: 'auto',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom:5
    },
    inner: {
        backgroundColor: COLORS.primaryOrangeHex, width: 130,
        alignItems: "center", justifyContent: "center", height: 45
    },
    white: {
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
    },
    height: {
        borderRadius: BORDERRADIUS.radius_15,
        backgroundColor: "rgba(255, 0, 0, .5)",
    }
});
