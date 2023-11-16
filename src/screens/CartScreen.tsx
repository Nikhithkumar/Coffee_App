import { ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useStore } from '../store/Store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING } from '../theme/theme';
import EmptyListAnimation from '../components/EmptyListAnimation';
import HeaderBar from '../components/HeaderBar';
import CartItem from '../components/CartItem';
import PaymentFooter from '../components/PaymentFooter';

const CartScreen = ({navigation,route}:any) => {
  const CartList = useStore((state: any) => state.CartList);
  const CartPrice = useStore((state: any) => state.CartPrice)

  const incrementCartItemQuantity = useStore(
    (state: any) => state.incrementCartItemQuantity,
  )

  const decrementCartItemQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity,
  )

  const calculateCartPrice = useStore(
    (state: any) => state.calculateCartPrice,
  )

  const incrementCartItemQuantityHandler = (id: string, size: string) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  const decrementCartItemQuantityHandler=(id:string,size:string)=>{
    decrementCartItemQuantity(id,size);
    calculateCartPrice()
  }

  const buttonPressHandler = () => {
    navigation.navigate('PaymentScreen',{amount:CartPrice})
  }

  const tabBarHeight = useBottomTabBarHeight()

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <HeaderBar title="Cart" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.ItemContainer}>
            {CartList.length == 0 ? <EmptyListAnimation title={"Cart is Empty"} /> :
              <View style={styles.ListItemContainer}>
                {CartList.map((item: any) => (
                  <TouchableOpacity key={item.id}
                  onPress={()=>{
                    navigation.navigate('Details',{
                      index:item.index,
                      id:item.id,
                      type:item.type
                    })
                  }}>
                    <CartItem 
                     id={item.id}
                     name={item.name}
                     imagelink_square={item.imagelink_square}
                     special_ingredient={item.special_ingredient}
                     roasted={item.roasted}
                     prices={item.prices}
                     type={item.type}
                     incrementCartItemQuantityHandler={incrementCartItemQuantityHandler}
                     decrementCartItemQuantityHandler={decrementCartItemQuantityHandler}/>
                  </TouchableOpacity>
                ))}
              </View>}
          </View>
          {CartList.length != 0 ?
          <PaymentFooter
            price={{ price: CartPrice, currency: '$' }}
            buttonTitle="Pay"
            buttonPressHandler={buttonPressHandler} />
          : null}
        </View>
       
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1
  },
  ScrollViewFlex: {
    flexGrow: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1
  },
  ListItemContainer:{
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  }
})

export default CartScreen
