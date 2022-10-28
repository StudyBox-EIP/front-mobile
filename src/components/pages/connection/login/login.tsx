import React from 'react';
import StudyBoxTextInput from '../../../elements/form/input/StudyBoxInput';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import StudyBoxSubmitButton from '../../../elements/form/submit/StudyBoxSubmitButton';
import {login} from '../../../api/auth';
import {COLORS_STUDYBOX} from '../../../elements/colors';

import STUDYBOX_ICON from '../../../../assets/svg/logo_studybox_couleur.svg';

const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main_wrapper: {
    width: '70%',
  },
  logo: {
    width: 146,
    height: 121,
    borderWidth: 5,
    alignSelf: 'center',
    marginTop: '-40%',
    marginBottom: '20%',
  },
  forgotPassword: {
    opacity: 0.6,
    color: COLORS_STUDYBOX.LIGHT_BLUE,
  },
});

export function LoginScreen({navigation}: any) {
  const data = {
    email: '',
    password: '',
  };

  function changeUsername(newText: string) {
    data.email = newText;
  }

  function changePassword(newText: string) {
    data.password = newText;
  }

  return (
    <View style={LoginStyle.container}>
      {/* Header */}
      <ConnectionHeader />

      {/* Body */}
      {/* Title */}
      {/* Mail */}
      {/* Passwords */}
      {/* Forgotten Password */}
      {/* Connection Button */}

      {/* Footer */}
    </View>
  );
}

const ConnectionHeader = () => {
  const style = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      marginLeft: 10,
    },
  });

  return (
    <View style={style.container}>
      <STUDYBOX_ICON
        color={COLORS_STUDYBOX.DARK_WHITE}
        width={50}
        height={50}
      />
      <Text style={style.text}>StudyBox</Text>
    </View>
  );
};

{/* <Image
  style={LoginStyle.logo}
  source={require('../../../../assets/studybox-logo.png')}
/>
<View style={LoginStyle.main_wrapper}>
  <StudyBoxTextInput
    text="Email"
    keyboardType={'email-address'}
    changeText={changeUsername}
  />
  <StudyBoxTextInput
    text="Mot de Passe"
    autoCompleteType="password"
    secureTextEntry={true}
    changeText={changePassword}
  />
  <TouchableOpacity
    onPress={() => {
      navigation.navigate('PasswordRecoveryScreen');
    }}>
    <Text style={LoginStyle.forgotPassword}>Mot de passe oublié ?</Text>
  </TouchableOpacity>
</View> */}
{/* Backend Authentication */}
{/* <StudyBoxSubmitButton
  text="Se connecter"
  onPress={() => login(navigation, data)}
/> */}