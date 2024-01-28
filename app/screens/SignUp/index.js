import { Button, Header, Icon, SafeAreaView, TextInput } from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import React, { useState } from "react";
import { ScrollView, View ,Text, AsyncStorage} from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { registration } from "../../actions/auth";
import { BaseSetting } from "../../config/setting";

const successInit = {
  name: true,
  email: true,
  country: true,
  mobileNumber:true,
  password:true,
  confirmPassword:true,
};

const SignUp = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Saudi Arabia");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(successInit);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const dispatch= useDispatch();

  const onSignUp = () => {
    if (name == "" || 
        email == "" ||
        country == "" || 
        mobileNumber == "" || 
        password  == "" || 
        confirmPassword == '') {  
      setSuccess({
        ...success,
        name: name != "" ? true : false,
        email: email != "" ? true : false,
        country: country != "" ? true : false,
        mobileNumber: mobileNumber!="" ? true : false,
        password: password!="" ? true : false,
        confirmPassword: confirmPassword!="" ? true : false,
      });
    } else {
       let requestObj={
          "params":{
          "country_id":country,
          "phone": mobileNumber,
          "lang":"ar_001",
          "name":name,
          "login":email,
          "password":password,
          "confirm_password":confirmPassword
            }
            
          }
          register(requestObj)
       }
  };

  const register = async(requestData)=>{
    setLoading(true);
    try {
      const response = await fetch(
     `${BaseSetting.base_Url}customer/registration`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify(requestData)
        },
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();
      setLoading(false);
      if(!resData.error){
        AsyncStorage.setItem(
          'userData',
          JSON.stringify({
            email:email ,
            userId: resData.result.uid,
          }),
        );
        navigation.navigate('OTP')
      }else{
        alert('User Already Exists')
      }
    } catch (err) {
      setLoading(false);
      navigation.navigate('OTP')
    }
  }  


  const validateConfirmPassword = (text) =>{
    if(text!=password){
     setConfirmPasswordError('Confrim Password Should Be Same')
    }else{
      setConfirmPasswordError('')
      setConfirmPassword(text)
    }
  }

  const getDisabled = () =>{
    if (name == "" || 
        email == "" ||
        country == "" || 
        mobileNumber == "" || 
        password  == "" || 
        confirmPassword == '' || confirmPasswordError!='') { 
          return true
  }
  return false
}


  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t("sign_up")}
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
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 65 }]}
            onChangeText={(text) => setName(text)}
            autoCorrect={false}
            placeholder={t("name")}
            placeholderTextColor={
              success.name ? BaseColor.grayColor : colors.primary
            }
            value={name}
          />
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 10 }]}
            onChangeText={(text) => setEmail(text)}
            autoCorrect={true}
            placeholder={t("email")}
            autoCapitalize='none'
            keyboardType="email-country"
            placeholderTextColor={
              success.email ? BaseColor.grayColor : colors.primary
            }
            value={email}
          />
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 10 }]}
            onChangeText={(text) => setMobileNumber(text)}
            autoCorrect={false}
            placeholder={t("mobileNumber")}
            keyboardType="number"
            placeholderTextColor={
              success.mobileNumber ? BaseColor.grayColor : colors.primary
            }
            value={mobileNumber}
          />
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 10 }]}
            onChangeText={(text) => setCountry(text)}
            autoCorrect={false}
            autoCapitalize='none'
            placeholder={t("country")}
            placeholderTextColor={
              success.country ? BaseColor.grayColor : colors.primary
            }
            value={country}
          />
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 10 }]}
            onChangeText={(text) => setPassword(text)}
            autoCorrect={false}
            autoCapitalize='none'
            placeholder={t("password")}
            placeholderTextColor={
              success.country ? BaseColor.grayColor : colors.primary
            }
            value={password}
          />
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 10 }]}
            onBlur={()=>{validateConfirmPassword(confirmPassword)}}
            onChangeText={(text) => setConfirmPassword(text)}
            autoCorrect={false}
            placeholder={t("confirmPassword")}
            placeholderTextColor={
              success.country ? BaseColor.grayColor : colors.primary
            }
            value={confirmPassword}
          />
          <Text>{confirmPasswordError}</Text>
          <View style={{ width: "100%" }}>
            <Button
              full
              style={{ marginTop: 20 }}
              loading={loading}
              onPress={() => onSignUp()}

            >
              {t("sign_up")}
            </Button>
          </View>
        </View>
      </ScrollView>
                    {/* disabled={getDisabled()} */}
    </SafeAreaView>
  );
};

export default SignUp;
