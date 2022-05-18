import React from 'react';
import StudyBoxTextInput from '../../../elements/form/input/StudyBoxInput';
import StudyBoxSubmitButton from '../../../elements/form/submit/StudyBoxSubmitButton';
import {Image, StyleSheet, View} from 'react-native';
import {register} from '../../../api/auth';

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
  const data = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };

  return (
    <View style={SignUpStyle.container}>
      <Image
        style={SignUpStyle.logo}
        source={require('../../../../assets/studybox-logo.png')}
      />
      <View style={SignUpStyle.container_input}>
        <StudyBoxTextInput
          text="First Name"
          changeText={(newText: string) => {
            data.first_name = newText;
          }}
        />
        <StudyBoxTextInput
          text="Last Name"
          changeText={(newText: string) => {
            data.last_name = newText;
          }}
        />
        <StudyBoxTextInput
          text="Email"
          autoCompleteType="email"
          changeText={(newText: string) => {
            data.email = newText;
          }}
        />
        <StudyBoxTextInput
          text="Password"
          autoCompleteType="password"
          secureTextEntry={true}
          changeText={(newText: string) => {
            data.password = newText;
          }}
        />
      </View>
      {/* Backend Authentication */}
      <StudyBoxSubmitButton
        text="Register"
        onPress={() => register(navigation, data)}
      />
    </View>
  );
}
