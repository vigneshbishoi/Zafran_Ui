import { AuthActions } from "@actions";
import {
  Button,
  Header,
  Icon,
  SafeAreaView,
  Text,
  TextInput,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { Images } from "@config";
import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage,
} from "react-native";
import { useDispatch } from "react-redux";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { BaseSetting } from "../../config/setting";

const { authentication } = AuthActions;
const successInit = {
  id: true,
  password: true,
};

const SignIn = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(successInit);

  const onLogin = () => {
    if (id == "" || password == "") {
      setSuccess({
        ...success,
        id: false,
        password: false,
      });
    } else {
      setLoading(true);
      userLogin(id,password);
      // dispatch(
      //   authentication(true, (response) => {
      //     if (response.success && id == "test" && password == "123456") {
      //       setLoading(false);
      //       navigation.navigate("ECommerceMenu");
      //     } else {
      //       setLoading(false);
      //     }
      //   })
      // );
    }
  };
  const userLogin = async(id,password)=>{
    let requestData={
      "params":{
        "login":id,
        "password":password
      }}
    console.log('requestObj',requestData)
      try {
        const response = await fetch(
       `${BaseSetting.base_Url}customer/login`,
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
        console.log('resData',resData)
        setLoading(false);
        if(!resData.error){
          AsyncStorage.setItem(
            'userData',
            JSON.stringify({
              email:id,
              userId: resData.result.uid,
            }),
          );
          navigation.navigate('ECommerceMenu')
        }else{
          alert('User Already Exists')
        }
      } catch (err) {
        setLoading(false);
      }
    } 
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t("sign_in")}
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

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={offsetKeyboard}
        style={{
          flex: 1,
        }}
      >
        <View style={styles.contain}>
          <TextInput
            style={[BaseStyle.textInput]}
            onChangeText={(text) => setId(text)}
            onFocus={() => {
              setSuccess({
                ...success,
                id: true,
              });
            }}
            autoCorrect={false}
            autoCapitalize='none'
            placeholder={t("Email")}
            placeholderTextColor={
              success.id ? BaseColor.grayColor : colors.primary
            }
            value={id}
            selectionColor={colors.primary}
          />
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 10 }]}
            onChangeText={(text) => setPassword(text)}
            onFocus={() => {
              setSuccess({
                ...success,
                password: true,
              });
            }}
            autoCorrect={false}
            autoCapitalize='none'
            placeholder={t("input_password")}
            secureTextEntry={true}
            placeholderTextColor={
              success.password ? BaseColor.grayColor : colors.primary
            }
            value={password}
            selectionColor={colors.primary}
          />
          <View style={{ width: "100%", marginVertical: 16 }}>
            <Button
              full
              loading={loading}
              style={{ marginTop: 20 }}
              onPress={onLogin}
            >
              {t("sign_in")}
            </Button>
          </View>
          <View style={styles.contentActionBottom}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ResetPassword")}
            >
              <Text body2 grayColor>
                {t("forgot_your_password")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text body2 primaryColor>
                {t("not_have_account")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
