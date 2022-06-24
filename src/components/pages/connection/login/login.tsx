import React from 'react';
import StudyBoxTextInput from '../../../elements/form/input/StudyBoxInput';
import {Image, StyleSheet, View} from 'react-native';
import StudyBoxSubmitButton from '../../../elements/form/submit/StudyBoxSubmitButton';
import {login} from '../../../api/auth';

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
      <Image
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
      </View>
      {/* Backend Authentication */}
      <StudyBoxSubmitButton
        text="Se connecter"
        onPress={() => login(navigation, data)}
      />
    </View>
  );
}
