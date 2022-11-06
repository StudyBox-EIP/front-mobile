import React from 'react';
import {Alert, Image, Keyboard, StyleSheet, Text, View} from 'react-native';
import {resetForgotPassword, sendRecoverMail} from '../../../../api/auth';
import {COLORS_STUDYBOX} from '../../../../elements/colors';
import {resetPageHistory} from '../../../../elements/controllers/navigation';
import StudyBoxTextInput from '../../../../elements/form/input/StudyBoxInput';
import StudyBoxSubmitButton from '../../../../elements/form/submit/StudyBoxSubmitButton';

export class PasswordRecoveryScreen extends React.Component {
  state = {
    email: '',
    token: '',
    newPassword: '',
    isEmailValid: false,
  };

  render() {
    const RecoverPasswordStyle = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      tokenContainer: {
        maxWidth: '70%',
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
      title: {
        color: COLORS_STUDYBOX.GREY,
        fontFamily: 'RopaSans-Regular',
        fontSize: 22,
        paddingBottom: 30,
      },
      submitButton: {
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'center',
      },
    });

    const checkEmail = async () => {
      const res = await sendRecoverMail(this.state.email?.trim());
      Keyboard.dismiss();

      if (res === 200) {
        this.setState({isEmailValid: true});
      } else {
        Alert.alert(
          'Email introuvable !',
          'Impossible de trouver un Email lié à un compte',
        );
      }
    };

    const resetPassword = async (token: string, newPassword: string) => {
      const res = await resetForgotPassword(token, newPassword);

      if (res === 200) {
        Alert.alert(
          'Mot de Passe Réinitialisé !',
          'Votre mot de passe a bien été réinitialisé',
        );
        resetPageHistory(this.props.navigation, 'AuthScreen');
      } else {
        Alert.alert('Token invalide !', 'Veuillez entrer un Token valide');
      }
    };

    return (
      <View style={RecoverPasswordStyle.container}>
        <Image
          style={RecoverPasswordStyle.logo}
          source={require('../../../../../assets/studybox-logo.png')}
        />
        <Text style={RecoverPasswordStyle.title}>
          Réinitialiser votre mot de passe
        </Text>
        <View style={RecoverPasswordStyle.main_wrapper}>
          <StudyBoxTextInput
            text="Email"
            keyboardType={'email-address'}
            changeText={(newText: string) => {
              this.setState({email: newText});
            }}
          />
        </View>
        {this.state.isEmailValid ? (
          <View style={RecoverPasswordStyle.tokenContainer}>
            <Text style={RecoverPasswordStyle.title}>
              Un Token vous a été envoyé par Mail
            </Text>
            <StudyBoxTextInput
              text="Token"
              keyboardType={'default'}
              changeText={(newText: string) => {
                this.setState({token: newText});
              }}
            />
            <StudyBoxTextInput
              text="Nouveau Mot de Passe"
              keyboardType={'default'}
              secureTextEntry={true}
              changeText={(newText: string) => {
                this.setState({newPassword: newText});
              }}
            />
            <View style={RecoverPasswordStyle.submitButton}>
              <StudyBoxSubmitButton
                text="Confirmer"
                onPress={() =>
                  resetPassword(this.state.token, this.state.newPassword)
                }
              />
            </View>
          </View>
        ) : (
          <StudyBoxSubmitButton
            text="Envoyer un Email de Confirmation"
            onPress={() => checkEmail()}
          />
        )}
      </View>
    );
  }
}
