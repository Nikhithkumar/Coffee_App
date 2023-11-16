import React, { forwardRef, useCallback, useImperativeHandle } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, useWindowDimensions, FlatList } from 'react-native'
import Animated, { interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import { useStore } from '../store/Store'
import { Portal } from 'react-native-portalize';
import LinearGradient from 'react-native-linear-gradient'
import CircularCarouselListItem, { ListItemWidth } from './CircularCarouselListItem'
import { useNavigation } from '@react-navigation/native'
import { PanGestureHandler } from 'react-native-gesture-handler'


interface BottomSheetProps {
    activeHeight: any
    backgroundColor: string
    backDropColor: string
}

const data = [
    require('../assets/coffee_assets/americano/square/americano_pic_1_square.png'),
    require('../assets/coffee_assets/americano/square/americano_pic_2_square.png'),
    require('../assets/coffee_assets/americano/square/americano_pic_3_square.png'),
    require('../assets/coffee_assets/black_coffee/square/black_coffee_pic_1_square.png'),
    require('../assets/coffee_assets/black_coffee/square/black_coffee_pic_2_square.png'),
    require('../assets/coffee_assets/black_coffee/square/black_coffee_pic_3_square.png'),
    require('../assets/coffee_assets/espresso/square/espresso_pic_1_square.png'),
    require('../assets/coffee_assets/espresso/square/espresso_pic_2_square.png'),
    require('../assets/coffee_assets/espresso/square/espresso_pic_3_square.png'),
    require('../assets/coffee_assets/espresso/square/espresso_pic_1_square.png'),
];

const BottomSheet = forwardRef(({
    activeHeight,
    backgroundColor,
    backDropColor,
}: any, ref) => {
    const CoffeeData = useStore((state: any) => state.CoffeeList);
    const navigation: any = useNavigation()
    const { height } = useWindowDimensions();
    const newActiveHeight = height - activeHeight;;
    const topAnimation = useSharedValue(height);
    const contentOffset = useSharedValue(0)
    const animationStyle = useAnimatedStyle(() => {
        const top = topAnimation.value;
        return {
            top,
        };
    });

    const expand = useCallback(() => {
        'worklet';
        topAnimation.value = withSpring(newActiveHeight, {
            damping: 100,
            stiffness: 400,
        });
    }, []);

    const close = useCallback(() => {
        'worklet';
        topAnimation.value = withSpring(height, {
            damping: 100,
            stiffness: 400,
        });
    }, []);

    useImperativeHandle(
        ref,
        () => ({
            expand,
            close,
        }),
        [expand, close],
    );

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
          ctx.startY = topAnimation.value;
        },
        onActive: (event, ctx) => {
          if (event.translationY < 0) {
            topAnimation.value = withSpring(newActiveHeight, {
              damping: 100,
              stiffness: 400,
            });
          } else {
            topAnimation.value = withSpring(ctx.startY + event.translationY, {
              damping: 100,
              stiffness: 400,
            });
          }
        },
        onEnd: _ => {
          if (topAnimation.value > newActiveHeight + 50) {
            topAnimation.value = withSpring(height, {
              damping: 100,
              stiffness: 400,
            });
          } else {
            topAnimation.value = withSpring(newActiveHeight, {
              damping: 100,
              stiffness: 400,
            });
          }
        },
      });

    const backDropAnimation = useAnimatedStyle(() => {
        const opacity = interpolate(
            topAnimation.value,
            [height, newActiveHeight],
            [0, 0.5],
        );
        const display = opacity === 0 ? 'none' : 'flex';
        return {
            opacity,
            display,
        };
    })

    const handleSubmit=()=>{
        close()
        setTimeout(()=>{
            navigation.navigate('MovieTabNavigation')
        },200)
    }
    return (
        <Portal>
            <TouchableWithoutFeedback
                onPress={() => {
                    close();
                }}>
                <Animated.View
                    style={[
                        styles.backDrop,
                        backDropAnimation,
                        { backgroundColor: COLORS.primaryBlackRGBA }
                    ]} />
            </TouchableWithoutFeedback>
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View
                    style={[
                        styles.container,
                        animationStyle,
                        { height: activeHeight, backgroundColor: COLORS.primaryDarkGreyHex },
                    ]}>
                    <View style={styles.lineContainer}>
                        <View style={styles.line} />
                        <View style={{ flexDirection: 'row', gap: SPACING.space_10 }}>
                            <TouchableOpacity  onPress={handleSubmit}>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                                    style={styles.CardLinearGradient}>
                                    <Image source={require('../assets/Icon.png')} style={styles.ImageView} />
                                    <Text style={styles.Text}>Tickets App</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('Tabs'), close() }}>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                                    style={styles.CardLinearGradient}>
                                    <Image source={require('../assets/Icon.png')} style={styles.ImageView} />
                                    <Text style={styles.Text}>Wallet App</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <>
                    {/* <FlatList
                        data={CoffeeData}
                        horizontal
                        keyExtractor={(_, index) => index.toString()}
                        scrollEventThrottle={1}
                        onScroll={(event) => {
                            contentOffset.value = event.nativeEvent.contentOffset.x;
                        }}
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={ListItemWidth}
                        pagingEnabled
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            height: 200,
                        }}
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 1.5 * ListItemWidth,
                        }}
                        renderItem={({ item, index }) => (
                            <CircularCarouselListItem
                                contentOffset={contentOffset}
                                id={item.id}
                                type={item.type}
                                itemIndex={item.index}
                                name={item.name}
                                imageSrc={item.imagelink_square}
                                index={index} />
                        )} /> */}
                        </>
                </Animated.View>
            </PanGestureHandler>
        </Portal>

    )
})

const styles = StyleSheet.create({
    backDrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'none',
    },
    container: {
        position: 'absolute',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        bottom: 0,
        left: 0,
        right: 0,

    },
    lineContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    line: {
        width: 50,
        height: 4,
        backgroundColor: 'black',
        borderRadius: 20,
    },
    CardLinearGradient: {
        padding: SPACING.space_12,
        alignItems: 'center',
        borderRadius: BORDERRADIUS.radius_10,
        marginTop: SPACING.space_20
    },
    ImageView: {
        width: 60,
        height: 100,
        resizeMode: "contain",
    },
    Text: {
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.poppins_semibold
    }
})

export default BottomSheet
