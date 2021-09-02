import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

const ScreenAuthStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 195,
    height: 161,
    borderWidth: 5,
    alignSelf: 'center',
  },
  main_text: {
    fontSize: 33,
    marginTop: 20,
    marginBottom: 20,
    color: '#737373',
    fontFamily: 'RopaSans-Regular',
  },
  button_auth: {
    width: '60%',
    paddingTop: 7,
    paddingBottom: 7,
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
  button_text: {
    color: '#737373',
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'RopaSans-Regular',
  },
});

export function ScreenAuth({navigation}: any) {
  return (
    <SafeAreaView style={ScreenAuthStyle.container}>
      <Image
        style={ScreenAuthStyle.logo}
        source={require('../../../assets/studybox-logo.png')}
      />
      <Text style={ScreenAuthStyle.main_text}>StudyBox</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('ManualSignIn')}
        style={ScreenAuthStyle.button_auth}>
        <Text style={ScreenAuthStyle.button_text}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ManualSignUp')}
        style={ScreenAuthStyle.button_auth}>
        <Text style={ScreenAuthStyle.button_text}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* <View style={ScreenAuthStyle.base}>
        <Button
          title="GOOGLE"
          onPress={() => navigation.navigate('GoogleOauthScreen')}
        />
      </View>
      <View style={ScreenAuthStyle.base}>
        <Button
          title="MICROSOFT"
          onPress={() => navigation.navigate('MicrosoftOauthScreen')}
        />
      </View>
      */
