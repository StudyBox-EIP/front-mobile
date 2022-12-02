import React, {Component} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {register} from '../../../api/auth';
import {ConnectionHeader} from '../login/login';
import {COLORS_STUDYBOX} from '../../../elements/colors';

const SignUpStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
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
      <ConnectionHeader />
      <SignUpBody navigation={navigation} />
      <TouchableOpacity />
    </View>
  );
}

class SignUpBody extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    buttonStatus: true,
    buttonCSS: StyleSheet.create({
      css: {
        marginTop: 10,
        width: '30%',
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
    signUpText: {
      color: 'white',
    },
  });

  checkUnlockButton() {
    if (
      this.state.first_name !== '' &&
      this.state.last_name !== '' &&
      this.state.email !== '' &&
      this.state.password !== '' &&
      this.state.confirmPassword !== ''
    ) {
      this.setState({buttonStatus: false});
      this.setState({
        buttonCSS: StyleSheet.create({
          css: {
            marginTop: 10,
            width: '30%',
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
            marginTop: 10,
            width: '30%',
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

  registerButtonEvent() {
    if (this.state.password === this.state.confirmPassword) {
      console.log('ok');
      register(this.props.navigation, {
        first_name: this.state.first_name.trim(),
        last_name: this.state.last_name.trim(),
        address: '',
        password: this.state.password.trim(),
        email: this.state.email.trim(),
      });
    } else {
      Alert.alert(
        'Erreur',
        'Veuillez vérifier la correspondance des mots de passe',
      );
    }
  }

  render() {
    return (
      <View style={this.style.bodyContainer}>
        <View style={this.style.titleContainer}>
          <Text style={this.style.title}>Inscription</Text>
          <Text>Veuillez renseigner vos informations</Text>
        </View>
        <View style={this.style.fieldContainer}>
          <TextInput
            placeholderTextColor={'black'}
            style={this.style.inputField}
            placeholder="Prénom"
            onChangeText={(newText: string) => {
              this.state.first_name = newText;
              this.checkUnlockButton();
            }}
          />
          <TextInput
            placeholderTextColor={'black'}
            style={this.style.inputField}
            placeholder="Nom"
            onChangeText={(newText: string) => {
              this.state.last_name = newText;
              this.checkUnlockButton();
            }}
          />
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
          <TextInput
            placeholderTextColor={'black'}
            style={this.style.inputField}
            placeholder="Confirmer Mot de Passe"
            autoCompleteType="password"
            secureTextEntry={true}
            onChangeText={(newText: string) => {
              this.state.confirmPassword = newText;
              this.checkUnlockButton();
            }}
          />
          <Pressable
            style={this.state.buttonCSS.css}
            disabled={this.state.buttonStatus}
            onPress={() => this.registerButtonEvent()}>
            <Text style={this.style.signUpText}>Inscription</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}
