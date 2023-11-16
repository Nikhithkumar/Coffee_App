import { StyleSheet, Text, View ,Animated} from 'react-native'
import React, { useEffect, useRef } from 'react'
import { CustomIconButton } from '../components'
import { COLORS, SIZES, icons } from '../constants'
import { connect } from 'react-redux'

const MainLayout = ({ children, isTradeModalVisible }: any) => {

  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(modalAnimatedValue, {
      toValue: isTradeModalVisible ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isTradeModalVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 240],
  });

  return (
    <View style={{ flex: 1 }}>
      {children}
      {isTradeModalVisible&&
      <Animated.View style={{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor:COLORS.transparentBlack,
        opacity:modalAnimatedValue
      }}
      />}
      <Animated.View style={{
        position: 'absolute',
        left: 0,
        top: modalY,
        width: '100%',
        padding: SIZES.padding,
        backgroundColor: COLORS.primary
      }}>
        <CustomIconButton
          label="Transfer"
          icon={icons.send}
          onPress={() => { }} />

        <CustomIconButton
          label="Withdraw"
          icon={icons.withdraw}
          containerStyle={{
            marginTop: SIZES.base
          }}
          onPress={() => { }} />
      </Animated.View>
    </View>
  )
}

function mapStateToProps(state: any) {
  return {
    isTradeModalVisible: state.tabReducer.isTradeModalVisible
  }
}

function mapDispatchToProps(dispatch: any) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)