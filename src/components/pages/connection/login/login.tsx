import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {login} from '../../../api/auth';
import {COLORS_STUDYBOX} from '../../../elements/colors';
import STUDYBOX_ICON from '../../../../assets/svg/logo_studybox_couleur.svg';

const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
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
  return (
    <View style={LoginStyle.container}>
      <ConnectionHeader />
      <ConnectionBody navigation={navigation} />
      <ConnectionFooter />
    </View>
  );
}

const ConnectionHeader = () => {
  const style = StyleSheet.create({
    container: {
      width: '100%',
      height: '10%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F9FAFA',
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

const ConnectionBody = (navigation: any) => {
  const style = StyleSheet.create({
    bodyContainer: {
      width: '100%',
    },
    title: {
      fontSize: 24,
    },
    titleContainer: {
      alignSelf: 'center',
      width: '80%',
    },
    inputField: {
      marginTop: 10,
      backgroundColor: '#F9FAFA',
      width: '100%',
      color: 'black',
    },
    forgottenPassword: {
      paddingTop: 10,
      width: '100%',
    },
  });

  let email = '';
  let password = '';

  return (
    <View style={style.bodyContainer}>
      <View style={style.titleContainer}>
        <Text style={style.title}>Connexion</Text>
        <Text>Veuillez-vous connecter pour continuer</Text>
      </View>
      <View style={{width: '80%', alignSelf: 'center', alignItems: 'center'}}>
        <TextInput
          placeholderTextColor={'black'}
          style={style.inputField}
          placeholder="Mail"
          keyboardType={'email-address'}
          onChangeText={(newText: string) => {
            email = newText;
          }}
        />
        <TextInput
          placeholderTextColor={'black'}
          style={style.inputField}
          placeholder="Mot de Passe"
          autoCompleteType="password"
          secureTextEntry={true}
          onChangeText={(newText: string) => {
            password = newText;
          }}
        />
        <Text style={style.forgottenPassword} onPress={console.log}>
          Mot de passe oublié ?
        </Text>

        {/* <TouchableOpacity style={{width: 10, height: 10, backgroundColor: 'green', alignSelf: 'flex-end'}} /> */}

        {/* <Button onPress={console.log} color={} title="Connexion" /> */}
        <Pressable
          style={{width: '25%', height: 40, alignSelf: 'flex-end', backgroundColor: COLORS_STUDYBOX.CONFIRM_GREEN, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}
          onPress={() => login(navigation, {email, password})}>
          <Text style={{color: 'white'}}>Connexion</Text>
        </Pressable>
      </View>
    </View>
  );
};

const ConnectionFooter = () => {
  const style = StyleSheet.create({
    container: {
      marginVertical: 20,
    },
  });

  return (
    <View style={style.container}>
      <Text>
        Pas encore de compte ?{' '}
        <Text style={{fontWeight: 'bold'}} onPress={console.log}>
          créez-en un
        </Text>
      </Text>
    </View>
  );
};
