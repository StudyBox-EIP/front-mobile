import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const LoginStyle = StyleSheet.create({
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
    marginTop: '-40%',
    marginBottom: '20%',
  },
  container_input: {
    width: '70%',
  },
  label_text: {
    fontSize: 16,
    fontFamily: 'RopaSans-Regular',
    color: '#737373',
  },
  textInput: {
    borderRadius: 7,
    marginBottom: 15,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 10,
  },
  button_login: {
    width: '60%',
    borderColor: 'transparent',
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 7,
    marginBottom: 15,
    backgroundColor: '#9CCC65',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 10,
    marginTop: '10%',
  },
  button_text: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'RopaSans-Regular',
    fontWeight: 'bold',
  },
});

export function Login({navigation}: any) {
  return (
    <View style={LoginStyle.container}>
      <Image
        style={LoginStyle.logo}
        source={require('../../../assets/studybox-logo.png')}
      />
      <View style={LoginStyle.container_input}>
        <Text style={LoginStyle.label_text}>Username</Text>
        <TextInput style={LoginStyle.textInput} />
      </View>
      <View style={LoginStyle.container_input}>
        <Text style={LoginStyle.label_text}>Password</Text>
        <TextInput style={LoginStyle.textInput} secureTextEntry={true} />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('')}
        style={LoginStyle.button_login}>
        <Text style={LoginStyle.button_text}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
