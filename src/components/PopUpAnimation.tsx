import LottieView from 'lottie-react-native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../theme/theme'

interface PopUpAnimationProps {
    style: any,
    source: any,
}

const PopUpAnimation: React.FC<PopUpAnimationProps> = ({
    style,
    source,
}) => {
    return (
        <View style={styles.LottieAnimationContainer}>
            <LottieView
                source={source}
                style={style}
                autoPlay
                loop={false}/>
        </View>
    )
}

const styles = StyleSheet.create({
    LottieAnimationContainer: {
        justifyContent: 'center',
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: COLORS.secondaryBlackRGBA,
    }
})

export default PopUpAnimation
