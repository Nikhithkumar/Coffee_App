import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import { COLORS, FONTS, icons } from "../constants"

interface TabIconProps {
  focused: boolean,
  icon: any,
  label: string,
  isTrade: boolean,
  iconStyle?: any
}
const TabIcon: React.FC<TabIconProps> = ({
  focused,
  icon,
  label,
  isTrade,
  iconStyle
}) => {
  if (isTrade) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: COLORS.black
        }}>
        <Image source={icon} resizeMode='contain'
          style={{
            width: 25,
            height: 25,
            tintColor: focused ? COLORS.secondary : COLORS.white
            , ...iconStyle
          }} />
        {icon == icons.close ? null : <Text style={{ color: COLORS.white, ...FONTS.h4 }}>{label}</Text>}
      </View>
    )
  }
  else {
    return (
      <View
        style={{ alignContent: 'center', justifyContent: 'center' }}>
        <Image source={icon} resizeMode='contain'
          style={{
            width: 25,
            height: 25,
            tintColor: focused ? COLORS.white : COLORS.secondary
            , ...iconStyle
          }} />
      </View>
    )
  }

}

export default TabIcon

const styles = StyleSheet.create({})