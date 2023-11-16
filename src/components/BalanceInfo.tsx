import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import { SIZES,COLORS,FONTS,icons } from '../constants'

interface BalanceInfoProps{
    title:string,
    displayAmount:string,
    changePct:number,
    containerStyle:any
}

const BalanceInfo:React.FC<BalanceInfoProps> = ({
    title,
    displayAmount,
    changePct,
    containerStyle
}) => {
  return (
    <View style={{...containerStyle}}>
      <Text style={{...FONTS.h3,color:COLORS.lightGray3}}>{title}</Text>
      <View style={styles.DetailsView}>
            <Text style={{...FONTS.h3,color:COLORS.lightGray3}}>$</Text>
            <Text style={{marginLeft:SIZES.base,...FONTS.h2,color:COLORS.white}}>{displayAmount.toLocaleString()}</Text>
            <Text style={{color:COLORS.lightGray3,...FONTS.h3}}>USD</Text>
      </View>
      <View style={styles.DetailsView}>
        {changePct!= 0 &&<Image
        source={icons.upArrow}
        style={{
            width:15,
            height:10,
            alignSelf:'center',
            tintColor:(changePct>0)?COLORS.lightGreen:COLORS.red,
            transform:(changePct>0)?[{rotate:'45deg'}]:[{rotate:'125deg'}]
        }}/>}
        <Text style={[styles.AmountText,{color:(changePct>0)?COLORS.lightGreen
        :COLORS.red}]}>{changePct.toFixed(2)}%</Text>

        <Text style={styles.ChangeText}>7d change</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    DetailsView:{
        flexDirection:'row',
        alignItems:'flex-end',
    },
    AmountText:{
        marginLeft:SIZES.base,
        alignSelf:'flex-end',
        ...FONTS.h4
    },
    ChangeText:{
        color:COLORS.lightGray3,
        alignSelf:'flex-end',
        marginLeft:SIZES.radius,
        ...FONTS.h5
    }
})

export default BalanceInfo
