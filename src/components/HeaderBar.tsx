import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';

const HeaderBar = ({title,onPress,openProfile}: any) => {
  return (
    <View style={styles.HeaderContainer}>
      <TouchableOpacity onPress={onPress}>
      <GradientBGIcon
        name="menu"
        color={COLORS.primaryOrangeHex}
        size={FONTSIZE.size_16}
      />
      </TouchableOpacity>
      <Text style={[styles.HeaderText,title.length>15?{fontSize:FONTSIZE.size_12}:null]}  
      numberOfLines={2}>{title.length>15?`${title.substring(0, 40)}...`:title}</Text>
      <TouchableOpacity onPress={openProfile}>
      <ProfilePic />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical:SPACING.space_20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:COLORS.primaryBlackHex
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
    width:220,
    textAlign:'center'
  },
});

export default HeaderBar;
