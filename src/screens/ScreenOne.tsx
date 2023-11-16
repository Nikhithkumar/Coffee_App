import {
  Image, SafeAreaView, StyleSheet, Text, View, Dimensions,
  TouchableOpacity, TextInput, Keyboard, ActivityIndicator
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../theme/theme'
import Animated, { BounceIn, FadeInDown, FadeInUp } from 'react-native-reanimated'

const w = Dimensions.get('screen').width

const ScreenOne = ({ navigation }: any) => {
  const [onSend, setOnSend] = useState(false)
  const [MobileNo, setMobileNo] = useState('')


  const handleOTP = () => {
    Keyboard.dismiss()
    setOnSend(true)
    setMobileNo('')
    navigation.navigate('ScreenTwo', { MobileNo: MobileNo })
    setOnSend(false)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primaryBlackHex }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly', paddingHorizontal: 25, marginBottom: 20 }}>
        <Animated.Text entering={FadeInUp.duration(1000).springify()} style={{ fontWeight: 'bold', color: COLORS.primaryWhiteHex, fontSize: 25, fontFamily: 'Poppins', letterSpacing: -1 }}>Log in</Animated.Text>
        <Animated.Image entering={FadeInUp.duration(1000).springify()} source={require('../assets/images/Login.png')} style={{ width: 250, height: 250, resizeMode: 'contain' }} />
        <Animated.View entering={FadeInDown.duration(1000).springify()} style={{ width: w - 50, borderRadius: 30, borderWidth: 1, borderColor: COLORS.secondaryDarkGreyHex, flexDirection: 'row', alignItems: 'center', paddingLeft: 25, justifyContent: 'flex-start' }}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.text}>+91</Text>
            <View style={styles.triangle} />
          </TouchableOpacity>
          <TextInput
            style={{ flex: 1, color: COLORS.primaryWhiteHex, fontWeight: '600' }}
            placeholder='Phone Number'
            placeholderTextColor={'gray'}
            value={MobileNo}
            onChangeText={(val) => {
              if (val.length == 10) {
                Keyboard.dismiss()
              }
              setMobileNo(val)
            }}
            keyboardType='numeric'
            maxLength={10}
          />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(100).duration(1000).springify()}>
          <TouchableOpacity  style={styles.btn} onPress={handleOTP}>
            {onSend && <Image source={require('../assets/images/OTP.png')} style={styles.buttonImage} />}
            {onSend ? <Text style={{ fontSize: 18, color: '#FFF', fontWeight: 'bold' }}>Sending OTP...</Text> :
              <Text style={{ fontSize: 18, color: COLORS.primaryWhiteHex, fontWeight: 'bold' }}>Get OTP</Text>}
          </TouchableOpacity>
        </Animated.View>
        <Animated.Text entering={FadeInDown.delay(200).duration(1000).springify()} style={styles.text}>By signing up,you agree with out Terms and conditions</Animated.Text>
      </View>
    </SafeAreaView>
  )
}

export default ScreenOne

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primaryWhiteHex,
    textAlign: 'center'
  },
  btn: {
    width: w - 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: 30,
    flexDirection: 'row',

  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 10,
    borderBottomWidth: 0, // Adjust the height of the triangle
    borderLeftWidth: 5, // Adjust the width of the triangle
    borderRightWidth: 5, // Adjust the width of the triangle
    borderTopColor: 'grey',
    borderBottomColor: 'transparent', // Color of the triangle
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginHorizontal: 15
  },
  buttonImage: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: COLORS.primaryWhiteHex
  },
})