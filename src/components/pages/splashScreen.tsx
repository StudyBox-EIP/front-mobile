import React, {Component} from 'react';
import {View, Image, StyleSheet, Alert} from 'react-native';

import {resetPageHistory} from '../elements/controllers/navigation';
import {getData} from '../api/userInfo';
import {checkJWT} from '../api/auth';

export class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(
      () =>
        getData('userInfo').then(async res => {
          if (res !== undefined && res !== null) {
            if (__DEV__) {
              console.info(res);
            }

            const JWT_Validity = await checkJWT(await JSON.parse(res)?.token);
            console.log(JWT_Validity);

            if (JWT_Validity === 408) {
              Alert.alert(
                'Session expirée !',
                'Votre session a expiré, veuillez vous reconnecter',
              );
              resetPageHistory(this.props.navigation, 'AuthScreen');
              return;
            } else if (JWT_Validity !== 200) {
              // Redirect to Home Page for any other Error
              resetPageHistory(this.props.navigation, 'AuthScreen');
              return;
            }
            // Successful Authentication
            resetPageHistory(this.props.navigation, 'HomePageScreen');
          } else {
            // Not stored JWT
            resetPageHistory(this.props.navigation, 'AuthScreen');
          }
        }),
      800,
    );
  }

  splashView = StyleSheet.create({
    base: {
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  render() {
    return (
      <View style={this.splashView.base}>
        <Image
          resizeMode="center"
          source={require('../../assets/studybox-logo.png')}
        />
      </View>
    );
  }
}
