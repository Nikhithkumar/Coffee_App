import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme'

interface EmptyListAnimationProps{
    title:string
}

const EmptyListAnimation:React.FC<EmptyListAnimationProps>= ({title}) => {
  return (
    <View style={styles.container}>
        <LottieView
          style={styles.Lottie} 
          source={require('../lottie/coffeecup.json')} 
          autoPlay
          loop/>
          <Text style={styles.text}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
    },
    Lottie:{
        height:200
    },
    text:{
        fontFamily:FONTFAMILY.poppins_medium,
        fontSize:FONTSIZE.size_16,
        color:COLORS.primaryOrangeHex,
        textAlign:"center"
    }
})

export default EmptyListAnimation
