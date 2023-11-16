import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import GradientBGIcon from '../components/GradientBGIcon';
import PaymentMethod from '../components/PaymentMethod';
import PaymentFooter from '../components/PaymentFooter';
import CustomIcon from '../components/CustomIcon';
import LinearGradient from 'react-native-linear-gradient';
import PopUpAnimation from '../components/PopUpAnimation';
import { useStore } from '../store/Store';



const PaymentScreen = ({ navigation, route }: any) => {const PaymentList = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];

  const [paymentMode, setPaymentMode] = useState('Credit Card');
  const [animation, setAnimation] = useState(false)

  const addToOrderHistoryListFromCart = useStore(
    (state: any) => state.addToOrderHistoryListFromCart,
  )

  const calculateCartPrice = useStore(
    (state: any) => state.calculateCartPrice,
  )

  const buttonPressHandler = () => {
    setAnimation(true)
    addToOrderHistoryListFromCart()
    calculateCartPrice()
    setTimeout(()=>{
      setAnimation(false)
      navigation.navigate('History')
    },2000)
    
  }

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {animation?
       ( <PopUpAnimation
        style={styles.LottieAnimation}
        source={require('../lottie/successful.json')}/>
        ):<></>}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={styles.HeaderContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <GradientBGIcon
              name="left"
              color={COLORS.primaryLightGreyHex}
              size={FONTSIZE.size_16}
            />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Payments</Text>
          <View style={styles.EmptyView} />
        </View>
        <View style={styles.PaymentOptionsContainer}>
          <TouchableOpacity
            onPress={() => { setPaymentMode('Credit Card') }}
            style={[
              styles.CreditCardContainer,
              {
                borderColor:
                  paymentMode == "Credit Card"
                    ? COLORS.primaryOrangeHex
                    : COLORS.primaryGreyHex,
              },
            ]}>
            <Text style={styles.CreditCardTitle}>Credit Card</Text>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.LinearGradientStyle}
              colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
              <View style={styles.CreditCardRow}>
                <CustomIcon
                  name="chip"
                  size={FONTSIZE.size_20 * 2}
                  color={COLORS.primaryOrangeHex}
                />
                <CustomIcon
                  name="visa"
                  size={FONTSIZE.size_30 * 2}
                  color={COLORS.primaryWhiteHex}
                />
              </View>
              <View style={styles.CreditCardNumberContainer}>
                <Text style={styles.CreditCardNumber}>3879</Text>
                <Text style={styles.CreditCardNumber}>8923</Text>
                <Text style={styles.CreditCardNumber}>6745</Text>
                <Text style={styles.CreditCardNumber}>4638</Text>
              </View>
              <View style={styles.CreditCardRow}>
                <View style={styles.CreditCardNameContainer}>
                  <Text style={styles.CreditCardNameSubitle}>
                    Card Holder Name
                  </Text>
                  <Text style={styles.CreditCardNameTitle}>
                    Robert Evans
                  </Text>
                </View>
                <View style={styles.CreditCardDateContainer}>
                  <Text style={styles.CreditCardNameSubitle}>
                    Expiry Date
                  </Text>
                  <Text style={styles.CreditCardNameTitle}>02/30</Text>
                </View>
              </View>
            </LinearGradient>

          </TouchableOpacity>
          {PaymentList.map((item: any, index: number) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => {
                setPaymentMode(item.name)
              }}
            >
              <PaymentMethod
                paymentMode={paymentMode}
                name={item.name}
                icon={item.icon}
                isIcon={item.isIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <PaymentFooter buttonPressHandler={buttonPressHandler}
        buttonTitle={`Pay with ${paymentMode}`}
        price={{ price: route.params.amount, currency: "$" }} />
    </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1
  },
  LottieAnimation:{
    flex:1,
  },
  HeaderContainer: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex
  },
  EmptyView: {
    height: SPACING.space_30,
    width: SPACING.space_30,
  },
  PaymentOptionsContainer: {
    gap: SPACING.space_10,
    padding: SPACING.space_15
  },
  CreditCardContainer: {
    padding: SPACING.space_10,
    gap: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15 * 2,
    borderWidth: 3,
  },
  CreditCardTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex
  },
  LinearGradientStyle: {
    borderRadius: BORDERRADIUS.radius_25,
    gap: SPACING.space_36,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_10,
  },
  CreditCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  CreditCardNumberContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  CreditCardNumber: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
    letterSpacing: SPACING.space_2
  },
  CreditCardNameSubitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  CreditCardNameTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  CreditCardNameContainer: {
    alignItems: 'flex-start',
  },
  CreditCardDateContainer: {
    alignItems: 'flex-end',
  },
})