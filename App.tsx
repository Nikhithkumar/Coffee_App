import React, { useEffect, useState } from 'react'
import { PermissionsAndroid, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { Host } from 'react-native-portalize';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import rootReducer from './src/store/rootReducer'
import SplashScreen from 'react-native-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainStack from './src/navigator/MainStack';
import NetInfo from "@react-native-community/netinfo";
import DrawerContent from './src/components/DrawerContent';
import LottieView from 'lottie-react-native';
import { COLORS } from './src/theme/theme';

const Drawer=createDrawerNavigator()

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)


const App = () => {
  const [isConnected, setIsConnected]:any = useState(true)

  useEffect(() => {

    SplashScreen.hide()
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, [])

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex:1,backgroundColor:COLORS.primaryBlackHex}}>
      <NavigationContainer>
        {
          isConnected ? (<Host>
            <Drawer.Navigator screenOptions={{
              headerShown:false,
              drawerStyle:{
                borderRadius:10,
              }
            }}
            drawerContent={(props)=><DrawerContent {...props}/>}>
              <Drawer.Screen name='MainStack' component={MainStack}/>
            </Drawer.Navigator>
          </Host>):(
            <View style={{flex:1,justifyContent:'center',backgroundColor:COLORS.primaryBlackHex}}>
                <LottieView
                style={{height:200}} 
                source={require('./src/lottie/noInternet.json')} 
                autoPlay={true}
                loop/>
            </View>
          )
        }
      </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  )
}

export default App

