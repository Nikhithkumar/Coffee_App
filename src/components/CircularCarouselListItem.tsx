import {
    Image, StyleSheet, ImageProps, Dimensions, TouchableOpacity
    , Text
} from 'react-native'
import React from 'react'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { COLORS, FONTSIZE } from '../theme/theme'
import { useNavigation } from '@react-navigation/native'

interface CircularCarouselListItemProps {
    id: string,
    type: string,
    itemIndex: string,
    name: string,
    imageSrc: ImageProps['source'],
    index: number,
    contentOffset: Animated.SharedValue<number>
}

const { width: windowWidth } = Dimensions.get('window')

export const ListItemWidth = windowWidth / 4;

const CircularCarouselListItem: React.FC<CircularCarouselListItemProps> = ({
    imageSrc, index, contentOffset, id, type, itemIndex, name }) => {
    const navigation:any = useNavigation()
    const rStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 2) * ListItemWidth,
            (index - 1) * ListItemWidth,
            index * ListItemWidth,
            (index + 1) * ListItemWidth,
            (index + 2) * ListItemWidth,
        ]

        const translateYOutputRange = [
            0,
            -ListItemWidth / 4,
            -ListItemWidth / 2.3,
            -ListItemWidth / 4,
            0,
        ];

        const opacityOutputRange = [0.7, 0.7, 1, 0.7, 0.7];

        const scaleOutputRange = [0.7, 0.7, 1, 0.7, 0.7];

        const translateY = interpolate(
            contentOffset.value,
            inputRange,
            translateYOutputRange,
            Extrapolate.CLAMP
        );

        const opacity = interpolate(
            contentOffset.value,
            inputRange,
            opacityOutputRange,
            Extrapolate.CLAMP
        );

        const scale = interpolate(
            contentOffset.value,
            inputRange,
            scaleOutputRange,
            Extrapolate.CLAMP
        );

        return {
            opacity,
            transform: [
                {
                    translateY: translateY,
                },
                // Padding left is better than translateX
                {
                    translateX: 1,
                },
                {
                    scale,
                },
            ],
        };
    })

    return (
        <Animated.View
            style={[styles.container, { width: ListItemWidth }, rStyle]}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Details', {
                    index: itemIndex,
                    id: id,
                    type: type,
                })
            }}>
                <Image source={imageSrc} style={{
                    margin: 3,
                    height: ListItemWidth,
                    width: ListItemWidth,
                    borderRadius: 200,
                    borderWidth: 2,
                    borderColor: COLORS.primaryWhiteHex,
                }} />
                <Text style={styles.NameText}>{name}</Text>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        aspectRatio: 1,
        elevation: 5,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
        alignSelf: 'center'
    },
    NameText: {
        textAlign: 'center',
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    }
})

export default CircularCarouselListItem
