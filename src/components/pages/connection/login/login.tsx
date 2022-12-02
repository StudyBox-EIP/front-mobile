import React, {Component} from 'react';
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
      <ConnectionFooter navigation={navigation} />
    </View>
  );
}

export const ConnectionHeader = () => {
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

class ConnectionBody extends Component {
  state = {
    email: '',
    password: '',
    buttonStatus: true,
    buttonCSS: StyleSheet.create({
      css: {
        width: '25%',
        height: 40,
        alignSelf: 'flex-end',
        backgroundColor: COLORS_STUDYBOX.UNCONFIRM_GREEN,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      },
    }),
  };

  style = StyleSheet.create({
    bodyContainer: {
      width: '100%',
    },
    fieldContainer: {
      width: '80%',
      alignSelf: 'center',
      alignItems: 'center',
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
    connectionText: {
      color: 'white',
    },
  });

  checkUnlockButton() {
    if (this.state.email !== '' && this.state.password !== '') {
      this.setState({buttonStatus: false});
      this.setState({
        buttonCSS: StyleSheet.create({
          css: {
            width: '25%',
            height: 40,
            alignSelf: 'flex-end',
            backgroundColor: COLORS_STUDYBOX.CONFIRM_GREEN,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          },
        }),
      });
    } else {
      this.setState({buttonStatus: true});
      this.setState({
        buttonCSS: StyleSheet.create({
          css: {
            width: '25%',
            height: 40,
            alignSelf: 'flex-end',
            backgroundColor: COLORS_STUDYBOX.UNCONFIRM_GREEN,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          },
        }),
      });
    }
  }

  render() {
    return (
      <View style={this.style.bodyContainer}>
        <View style={this.style.titleContainer}>
          <Text style={this.style.title}>Connexion</Text>
          <Text>Veuillez-vous connecter pour continuer</Text>
        </View>
        <View style={this.style.fieldContainer}>
          <TextInput
            placeholderTextColor={'black'}
            style={this.style.inputField}
            placeholder="Mail"
            keyboardType={'email-address'}
            onChangeText={(newText: string) => {
              this.state.email = newText;
              this.checkUnlockButton();
            }}
          />
          <TextInput
            placeholderTextColor={'black'}
            style={this.style.inputField}
            placeholder="Mot de Passe"
            autoCompleteType="password"
            secureTextEntry={true}
            onChangeText={(newText: string) => {
              this.state.password = newText;
              this.checkUnlockButton();
            }}
          />
          <Text
            style={this.style.forgottenPassword}
            onPress={() =>
              this.props.navigation.navigate('PasswordRecoveryScreen')
            }>
            Mot de passe oublié ?
          </Text>
          <Pressable
            style={this.state.buttonCSS.css}
            disabled={this.state.buttonStatus}
            onPress={() =>
              login(this.props.navigation, {
                email: this.state.email.trim(),
                password: this.state.password,
              })
            }>
            <Text style={this.style.connectionText}>Connexion</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const ConnectionFooter = (props: any) => {
  const style = StyleSheet.create({
    container: {
      marginVertical: 20,
    },
    text: {
      fontWeight: 'bold',
    },
  });

  return (
    <View style={style.container}>
      <Text>
        Pas encore de compte ?{' '}
        <Text
          style={style.text}
          onPress={() => props.navigation.navigate('ManualSignUp')}>
          créez-en un
        </Text>
      </Text>
    </View>
  );
};
