import { Button, Header, Icon, SafeAreaView } from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import React, { useState,useRef, useEffect } from "react";
import { ScrollView, View ,Text,AsyncStorage} from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { TextInput } from "../../components";
import CustomTextInput from "./CustomTextInput";
import { BaseSetting } from "../../config/setting";

const OTP = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const [otpArray, setOtpArray] = useState(['', '', '', '']);
  const [data, setData] = useState([])

  useEffect(() => {
    const asyncFunctionData = async () => {
      try {
        const storageData = await AsyncStorage.getItem('userData');
        let dats=JSON.parse(storageData);
        setData(JSON.parse(storageData));
      } catch (e) {}
    }
    asyncFunctionData();
   }, []);
 
  const onOtpChange = index => {
    return value => {
      if (isNaN(Number(value))) {
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);
      if (value !== '') {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        } 
      }
    };
  };

  const onOtpKeyPress = index => {
    return ({nativeEvent: {key: value}}) => {
      if (value === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        } else if (index === 4) {
          fourthTextInputRef.current.focus();
        } 
        if (index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = '';
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };
  
  const refCallback = textInputRef => node => {
    textInputRef.current = node;
  };

    async function onSubmitOtp() {
        const code = otpArray.join('');
        let requestData={
            "params":{
                "login":data.email,
                "otp":code
            }}
            console.log('requestData',requestData)
        try {
            const response = await fetch(
                `${BaseSetting.base_Url}customer/verify_otp`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData)
                },
            );
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            console.log('response',response)
            const resData = await response.json();
            console.log('resData',resData)
            if(resData.result.message=='Your OTP verification is failed. Please retry with new OTP'){
            alert('OTP Verification Failed')
            }else{
                navigation.navigate('ECommerceMenu')
            }
            // if (!(resData.message)) {
            //     navigation.navigate('OTP')
            // } else {
            //     alert('User Already Exists')
            // }
        } catch (err) {
        }
    }

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t("OTP")}
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={styles.contain}>
        <View>
            <Text style={{textAlign: 'center'}}>
              Enter OTP sent to your{' ' + 87687687}
            </Text>
            <View style={[styles.row, styles.mt12]}>
              {[
                firstTextInputRef,
                secondTextInputRef,
                thirdTextInputRef,
                fourthTextInputRef,
              ].map((textInputRef, index) => (
                  <CustomTextInput
                  containerStyle={[styles.fill, styles.mr12]}
                  value={otpArray[index]}
                  onKeyPress={onOtpKeyPress(index)}
                  onChangeText={onOtpChange(index)}
                  keyboardType={'numeric'}
                  maxLength={1}
                  style={[styles.otpText, styles.centerAlignedText]}
                  autoFocus={index === 0 ? true : undefined}
                  refCallback={refCallback(textInputRef)}
                  key={index}
                />
              ))}
            </View> 
            </View>
          <View style={{ width: "100%" }}>
            <Button
              full
              style={{ marginTop: 20 }}
              loading={loading}
              onPress={() => onSubmitOtp()}
            >
              {t("Submit")}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OTP;
