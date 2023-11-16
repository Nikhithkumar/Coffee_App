import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useStore } from '../store/Store'
import HeaderBar from '../components/HeaderBar'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import EmptyListAnimation from '../components/EmptyListAnimation'
import OrderHistoryCard from '../components/OrderHistoryCard'
import PopUpAnimation from '../components/PopUpAnimation'

const OrderHistoryScreen = ({ navigation }: any) => {
  const OrderList = useStore((state: any) => state.OrderHistoryList)
  const [animation, setAnimation] = useState(false)
  const tabBarHeight = useBottomTabBarHeight()
  const navigationHandler = ({ index, id, type }: any) => {
    navigation.navigate('Details', {
      index, id, type
    })
  }
  const handlePressButton=()=>{
    setAnimation(true)
    setTimeout(()=>{
      setAnimation(false)
    },2000)
  }
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <HeaderBar title="Order History" />
      {animation?
       ( <PopUpAnimation
        style={styles.LottieAnimation}
        source={require('../lottie/download.json')}/>
        ):<></>}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>

        {OrderList.length == 0 ? (
          <EmptyListAnimation title={'No Order History'} />
        ) : (
          <View style={[styles.ListItemContainer, , { marginBottom: tabBarHeight }]}>
            {OrderList.map((data: any, index: any) => (
              <OrderHistoryCard
                key={index.toString()}
                navigationHandler={navigationHandler}
                CartList={data.CartList}
                CartListPrice={data.CartListPrice}
                OrderDate={data.OrderDate} />
            ))}
            {OrderList.length > 0 ? <>
              <TouchableOpacity style={styles.DownloadButton} onPress={handlePressButton}>
                <Text style={styles.DownloadButtonText}>Download</Text>
              </TouchableOpacity>
            </> : <></>}
          </View>)}

      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ListItemContainer: {
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_10,
  },
  DownloadButton: {
    margin: SPACING.space_20,
    height: SPACING.space_24 * 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_20
  },
  DownloadButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  LottieAnimation:{
    flex:1
  }

})

export default OrderHistoryScreen
