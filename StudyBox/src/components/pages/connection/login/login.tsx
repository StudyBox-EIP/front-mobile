import React from 'react';
import StudyBoxTextInput from '../../../elements/form/input/StudyBoxInput';
import {Image, StyleSheet, View} from 'react-native';
import StudyBoxSubmitButton from '../../../elements/form/submit/StudyBoxSubmitButton';

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
  return (
    <View style={LoginStyle.container}>
      <Image
        style={LoginStyle.logo}
        source={require('../../../../assets/studybox-logo.png')}
      />
      <View style={LoginStyle.main_wrapper}>
        <StudyBoxTextInput text="Username" />
        <StudyBoxTextInput
          text="Password"
          autoCompleteType="password"
          secureTextEntry={true}
        />
      </View>
      {/* Backend Authentication */}
      <StudyBoxSubmitButton
        text="Login"
        onPress={() => navigation.navigate('HomePageScreen')}
      />
    </View>
  );
}
