import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {COLORS_STUDYBOX} from '../../../elements/colors';

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
    color: COLORS_STUDYBOX.STUDYBOX_BLACK,
    fontFamily: 'RopaSans-Regular',
  },
  button_auth: {
    width: '60%',
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 7,
    marginBottom: 15,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 10,
  },
  button_text: {
    color: COLORS_STUDYBOX.STUDYBOX_BLACK,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'RopaSans-Regular',
  },
});

export function AuthScreen({navigation}: any) {
  return (
    <SafeAreaView style={ScreenAuthStyle.container}>
      <Image
        style={ScreenAuthStyle.logo}
        source={require('../../../../assets/studybox-logo.png')}
      />
      <Text style={ScreenAuthStyle.main_text}>StudyBox</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('ManualSignIn')}
        style={ScreenAuthStyle.button_auth}>
        <Text style={ScreenAuthStyle.button_text}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ManualSignUp')}
        style={ScreenAuthStyle.button_auth}>
        <Text style={ScreenAuthStyle.button_text}>S'enregistrer</Text>
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
      </View>navigation
      */
