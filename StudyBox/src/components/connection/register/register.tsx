import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const ManualSignUpScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  textInput: {
    borderColor: 'black',
    borderRadius: 16,
    borderWidth: 1,
    color: 'black',
    minWidth: '60%',
    backgroundColor: 'grey',
    marginVertical: 5,
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ManualSignUpScreen({navigation}: any) {
  return (
    <View style={ManualSignUpScreenStyle.container}>
      <Text>Enter your Credentials for Registration</Text>
      <TextInput
        style={ManualSignUpScreenStyle.textInput}
        placeholder="Username"
        autoCompleteType="username"
      />
      <TextInput
        style={ManualSignUpScreenStyle.textInput}
        placeholder="Email"
        autoCompleteType="email"
      />
      <TextInput
        style={ManualSignUpScreenStyle.textInput}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TextInput
        style={ManualSignUpScreenStyle.textInput}
        placeholder="Confirm Password"
        secureTextEntry={true}
      />
    </View>
  );
}
