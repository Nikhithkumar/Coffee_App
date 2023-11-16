import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "@react-native-community/blur";

import HomeScreen from "../screens/HomeScreen";
import FavortiesScreen from "../screens/FavortiesScreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";
import CartScreen from "../screens/CartScreen";
import CustomIcon from "../components/CustomIcon";
import { COLORS } from "../theme/theme";


const Tab=createBottomTabNavigator()

const TabNavigation=()=>{
    return(
       <Tab.Navigator 
       initialRouteName="Home"
        screenOptions={{
            headerShown:false,
            tabBarHideOnKeyboard:true,
            tabBarShowLabel:false,
            tabBarStyle:styles.tabBarStyle,
            tabBarBackground:()=>(
                <BlurView overlayColor="" blurAmount={15} style={styles.blurView}/>
            )
        }}>
        <Tab.Screen name="Home" component={HomeScreen}
            options={{
                
                tabBarIcon:(({focused,color,size})=>(
                    <CustomIcon name="home" size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex}/>
                ))
            }}/>
         <Tab.Screen name="Cart" component={CartScreen}
        options={{
            tabBarIcon:(({focused,color,size})=>(
                <CustomIcon name="cart" size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex}/>
            ))
        }} />
         <Tab.Screen name="Favorties" component={FavortiesScreen}
            options={{
                tabBarIcon:(({focused,color,size})=>(
                    <CustomIcon name="like" size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex}/>
                ))
            }}  />
        <Tab.Screen name="History" component={OrderHistoryScreen}
        options={{
            tabBarIcon:(({focused,color,size})=>(
                <CustomIcon name="bell" size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex}/>
            ))
        }} />
        
       </Tab.Navigator>
    )
}

const styles=StyleSheet.create({
    tabBarStyle:{
        height:60,
        position:'absolute',
        backgroundColor:COLORS.primaryBlackRGBA,
        borderTopColor:'transparent',
        elevation:0,
        borderTopWidth:0
    },
    blurView:{
        position:'absolute',
        top:0,
        bottom:0,
        right:0,
        left:0
    }
})

export default TabNavigation