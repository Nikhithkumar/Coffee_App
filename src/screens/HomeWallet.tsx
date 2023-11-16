import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { connect } from 'react-redux'

import { MainLayout } from './'
import { getHoldings, getCoinMarket } from '../store/market/marketAction'
import { SIZES, COLORS, FONTS, dummyData, icons } from '../constants'
import BalanceInfo from '../components/BalanceInfo'
import { CustomIconButton } from '../components'

const HomeWallet = ({ getCoinMarket, getHoldings, myHoldings, coins }: any) => {

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getHoldings(holdings = dummyData.holdings)
  //     getCoinMarket()
  //   }, [])
  // )

  useEffect(()=>{
    getHoldings(holdings = dummyData.holdings)
    getCoinMarket()
  },[])

  let totalWallet = myHoldings.reduce((a: any, b: any) => a + (b.total || 0), 0)
  let valueChange = myHoldings.reduce((a: any, b: any) => a + (b.holding_value_change_7d || 0), 0)
  let percChange = valueChange / (totalWallet - valueChange) * 100

  console.log("totalWallet",totalWallet,"valueChange",valueChange,"percChange",percChange)

  const renderWalletInfoSection = () => {
    return (
      <View style={styles.container}>
        <BalanceInfo
          title="Your Wallet"
          displayAmount={totalWallet}
          changePct={percChange}
          containerStyle={{
            marginTop: 50
          }} />
          <View style={styles.ButtonBox}>
          <CustomIconButton
            label="Transfer"
            icon={icons.send}
            containerStyle={{
              flex:1,
              height:50,
              marginRight: SIZES.radius
            }}
            onPress={() => { }} />

          <CustomIconButton
            label="Withdraw"
            icon={icons.withdraw}
            containerStyle={{
              flex:1,
              height:50,
            }}
            onPress={() => { }} />
        </View>
      </View>
    )
  }

  return (
    <MainLayout>
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        {/* Header -Wallet Info */}
        {renderWalletInfoSection()}
        {/* Charts */}
        {/* <Chart 
          containerStyle={{
            marginTop:SIZES.padding*2
          }}
          chartPrices={coins[0]?.sparkline_in_7d?.price}/> */}
      </View>
    </MainLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.padding,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: COLORS.gray,
  },
  ButtonBox: {
    flexDirection: 'row',
    marginTop:30,
    marginBottom:-15,
    paddingHorizontal:SIZES.radius
  }
})

function mapStateToProps(state: any) {
  return {
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    getHoldings: (holdings: any, currency: string, orderBy: string
      , sparkline: boolean, priceChangePerc: string, perPage: number, page: number) => {
      return dispatch(getHoldings(holdings, currency, orderBy
        , sparkline, priceChangePerc, perPage, page))
    },

    getCoinMarket: (currency: string, orderBy: string, sparkline: boolean,
      priceChangePerc: string, perPage: number, page: number) => {
      return dispatch(getCoinMarket(currency, orderBy
        , sparkline, priceChangePerc, perPage, page))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeWallet)
