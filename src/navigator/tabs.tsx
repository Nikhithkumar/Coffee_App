import React from "react";
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { connect } from 'react-redux'
import { setTradeModalVisibility } from '../store/tab/tabActions'

import { COLORS, FONTS, icons } from "../constants"
import HomeWallet from "../screens/HomeWallet";
import { TabIcon } from "../components";

const Tab = createBottomTabNavigator()

const TabBarCustonButton = ({ children, onPress }: any) => {
    return (
        <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
            {children}
        </TouchableOpacity>
    )
}

const Tabs = ({ setTradeModalVisibility, isTradeModalVisible }: any) => {
    function tradeTabButtonOnClickHandler() {
        setTradeModalVisibility(!isTradeModalVisible)
    }
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: COLORS.primary,
                    borderTopColor: 'transparent',
                    height: 60
                }
            }}>
            <Tab.Screen
                name="Home"
                component={HomeWallet}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!isTradeModalVisible) {
                            return <TabIcon
                                focused={focused}
                                label="Home"
                                icon={icons.home}
                                isTrade={false}
                            />
                        }
                    }
                }}
                listeners={{
                    tabPress: (e) => {
                        if(isTradeModalVisible){
                            e.preventDefault();
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Portfolio"
                component={HomeWallet}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!isTradeModalVisible) {

                            return <TabIcon
                                focused={focused}
                                label="Portfolio"
                                icon={icons.briefcase}
                                isTrade={false}
                            />
                        }
                    }
                }}
                listeners={{
                    tabPress: (e) => {
                        if(isTradeModalVisible){
                            e.preventDefault();
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Trade"
                component={HomeWallet}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <TabIcon
                            focused={focused}
                            label="Trade"
                            icon={isTradeModalVisible?icons.close:icons.trade}
                            isTrade={true}
                        />
                    },
                    tabBarButton: (props) => (
                        <TabBarCustonButton {...props} onPress={() => { tradeTabButtonOnClickHandler() }} />
                    )
                }}
            />
            <Tab.Screen
                name="Market"
                component={HomeWallet}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!isTradeModalVisible) {

                            return <TabIcon
                                focused={focused}
                                label="Market"
                                icon={icons.market}
                                isTrade={false}
                            />
                        }
                    }
                }}
                listeners={{
                    tabPress: (e) => {
                        if(isTradeModalVisible){
                            e.preventDefault();
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={HomeWallet}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (!isTradeModalVisible) {

                            return <TabIcon
                                focused={focused}
                                label="Profile"
                                icon={icons.profile}
                                isTrade={false}
                            />
                        }
                    }
                }}
                listeners={{
                    tabPress: (e) => {
                        if(isTradeModalVisible){
                            e.preventDefault();
                        }
                    }
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    }
})

function mapStateToProps(state: any) {
    return {
        isTradeModalVisible: state.tabReducer.isTradeModalVisible
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        setTradeModalVisibility: (isVisible: boolean) => {
            return dispatch(setTradeModalVisibility(isVisible))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)