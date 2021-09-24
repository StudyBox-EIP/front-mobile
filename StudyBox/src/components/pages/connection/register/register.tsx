import React from 'react';
import StudyBoxTextInput from '../../../elements/form/input/StudyBoxInput';
import StudyBoxSubmitButton from '../../../elements/form/submit/StudyBoxSubmitButton';
import {Image, StyleSheet, View} from 'react-native';

const SignUpStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 146,
    height: 121,
    borderWidth: 5,
    alignSelf: 'center',
    marginBottom: '10%',
  },
  container_input: {
    width: '70%',
  },
});

export function SignUpScreen({navigation}: any) {
  return (
    <View style={SignUpStyle.container}>
      <Image
        style={SignUpStyle.logo}
        source={require('../../../../assets/studybox-logo.png')}
      />
      <View style={SignUpStyle.container_input}>
        <StudyBoxTextInput text="Username" />
        <StudyBoxTextInput text="Email" autoCompleteType="email" />
        <StudyBoxTextInput
          text="Password"
          autoCompleteType="password"
          secureTextEntry={true}
        />
        <StudyBoxTextInput
          text="Confirm Password"
          autoCompleteType="password"
          secureTextEntry={true}
        />
      </View>
      <StudyBoxSubmitButton
        text="Register"
        onPress={() => navigation.navigate('')}
      />
    </View>
  );
}
