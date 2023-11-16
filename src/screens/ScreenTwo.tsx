import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Modal,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import { COLORS } from '../theme/theme';
import AsyncStorage from "@react-native-async-storage/async-storage";

const w = Dimensions.get('screen').width;

const ScreenTwo = ({navigation,route}:any) => {
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const [visible,setVisible]=useState(false)
  const [otp,setOtp]=useState('')
  const {MobileNo}=route.params

  const handleInputChange = (text:any, nextInputRef:any) => {
    const updatedValue = otp + text;
    setOtp(updatedValue);
    if(updatedValue.length==4){
      Keyboard.dismiss()
    }
    if (text.length === 1 && nextInputRef) {
      nextInputRef.current.focus();
    }
    
  };

  const handleSubmit=async()=>{

    const data =await AsyncStorage.getItem('MobileNo')
    if(data){
      await AsyncStorage.removeItem('MobileNo');
    }

    if(otp.length==4){
      setTimeout(async()=>{
        await AsyncStorage.setItem('MobileNo',MobileNo.toString())
        navigation.navigate('TabBar')
      })
    }
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primaryBlackHex}}>
      <ScrollView
        keyboardDismissMode='interactive'
        contentContainerStyle={{flexGrow: 1, alignItems: 'center', justifyContent: 'space-evenly',paddingHorizontal:25,marginBottom:20}}>
        <Text
          style={{
            fontWeight: 'bold',
            color: COLORS.primaryWhiteHex,
            fontSize: 25,
            fontFamily: 'Poppins',
            letterSpacing: -1,
          }}>
          OTP Verify
        </Text>
        <Image
          source={require('../assets/images/Login.png')}
          style={{width: 250, height: 250, resizeMode: 'contain'}}
        />
        <>
          <Text style={styles.text}>
            OTP Sent to {'\n'}{' '}
            <Text style={{fontWeight: 'bold', color: COLORS.primaryWhiteHex, margin: 3}}>
             {MobileNo}
            </Text>
          </Text>
        </>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 15,
            flexDirection: 'row',
          }}>
          <TextInput
            ref={input1Ref}
            style={styles.textInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={text => handleInputChange(text, input2Ref)}
          />
          <TextInput
            ref={input2Ref}
            style={styles.textInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={text => handleInputChange(text, input3Ref)}
          />
          <TextInput
            ref={input3Ref}
            style={styles.textInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={text => handleInputChange(text, input4Ref)}
          />
          <TextInput
            ref={input4Ref}
            style={styles.textInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={text => handleInputChange(text, null)}
          />
        </View>

        <TouchableOpacity style={[styles.btn,{backgroundColor:otp.length<4?'#DEA07A':COLORS.primaryOrangeHex}]} 
        onPress={handleSubmit} disabled={otp.length<4?true:false}>
          <Text style={{fontSize: 18, color: '#FFF', fontWeight: 'bold'}}>
            Verify OTP
          </Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          By signing up,you agree with out Terms and conditions
        </Text>
      </ScrollView>
      <Modal visible={visible} transparent={true} animationType='fade'>
        <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center',alignItems:'center'}}>
            <View style={{width:w-60,height:120,borderRadius:20,paddingVertical:20,backgroundColor:COLORS.primaryWhiteHex,alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{fontSize:16,color:'black',fontWeight:'800'}}>Your details has been submitted.</Text>
                <TouchableOpacity style={{backgroundColor:COLORS.primaryOrangeHex,width:60,height:30,borderRadius:10,alignItems:'center',justifyContent:'center',alignSelf:'center'}} onPress={()=>setVisible(false)}>
                    <Text style={{textAlign:'right',fontWeight:'bold',color:COLORS.primaryWhiteHex}}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ScreenTwo;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primaryWhiteHex,
    textAlign: 'center',
    
  },
  btn: {
    width: w - 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: 30,
  },
  textInput: {
    width: 60,
    height: 50,
    borderRadius: 15,
    borderColor: 'gray',
    marginHorizontal: 5,
    borderWidth: 1,
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 25,
    color:COLORS.primaryWhiteHex
  },
});
