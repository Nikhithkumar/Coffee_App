import { StyleSheet, Text, Image, TouchableOpacity, ImageProps } from 'react-native'
import React from 'react'
import { COLORS, SIZES, FONTS } from '../constants'

const CustomIconButton = ({ label,
    icon,
    containerStyle,
    onPress }: any) => {
    return (
        <TouchableOpacity
            style={[styles.ButtonStyles, {...containerStyle}]} onPress={onPress}>
            <Image source={icon} resizeMode='contain' style={{
                width: 20,
                height: 20
            }} />
            <Text style={{ marginLeft: SIZES.base, ...FONTS.h3,color:COLORS.primary,fontWeight:'bold' }}>{label}</Text>
        </TouchableOpacity>
    )
}

export default CustomIconButton

const styles = StyleSheet.create({
    ButtonStyles: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
    }
})