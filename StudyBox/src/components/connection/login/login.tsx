import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const ManualSignInScreenStyle = StyleSheet.create({
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
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ManualSignInScreen({navigation}: any) {
  return (
    <View style={ManualSignInScreenStyle.container}>
      <Text>Enter your Credentials</Text>
      <TextInput
        style={ManualSignInScreenStyle.textInput}
        placeholder="Username"
      />
      <TextInput
        style={ManualSignInScreenStyle.textInput}
        placeholder="Password"
      />
    </View>
  );
}
