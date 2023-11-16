import React from 'react';
import HomeScreen from '../screens/MovieScreen/HomeScreen';
import SearchScreen from '../screens/MovieScreen/SearchScreen';
import TicketScreen from '../screens/MovieScreen/TicketScreen';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const MovieTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.Black,
          borderTopWidth: 0,
          height: SPACING.space_10 * 6,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                ]}>
                <CustomIcon
                  name="video"
                  color={focused ?COLORS.primaryOrangeHex:COLORS.White}
                  size={FONTSIZE.size_16}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                 
                ]}>
                <CustomIcon
                  name="search"
                  color={focused ?COLORS.primaryOrangeHex:COLORS.White}
                  size={FONTSIZE.size_16}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={TicketScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  
                ]}>
                <CustomIcon
                  name="ticket"
                  color={focused ?COLORS.primaryOrangeHex:COLORS.White}
                  size={FONTSIZE.size_16}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="User"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                 
                ]}>
                <CustomIcon
                  name="user"
                  color={focused ?COLORS.primaryOrangeHex:COLORS.White}
                  size={FONTSIZE.size_16}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeTabBackground: {
    backgroundColor: COLORS.Black,
    padding: SPACING.space_18,
    borderRadius: SPACING.space_18 * 10,
  },
});

export default MovieTabNavigation;
