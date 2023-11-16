import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import CustomIcon from './CustomIcon'

const InputHeader = (props:any) => {
    const [searchText, setSearchText] = useState<string>("")
    return (
        <View style={styles.InputBox}>
            <TextInput style={styles.textInput}
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
                placeholder="Search your Movies..."
                placeholderTextColor={COLORS.WhiteRGBA32} 
                />
            <TouchableOpacity style={styles.SearchBox} onPress={()=>props.searchFunction(searchText)}>
                <CustomIcon name="search" size={20} color={COLORS.primaryLightGreyHex} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    InputBox: {
        flexDirection: 'row',
        display: 'flex',
        marginVertical: SPACING.space_8,
        paddingHorizontal: SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_20,
        borderColor: COLORS.Grey,
        borderWidth: .5,
        alignItems: 'center'
    },
    textInput: {
        width: '90%',
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.White,

    },
    SearchBox: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.space_10,
    },
})

export default InputHeader
