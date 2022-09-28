import React, {Component} from 'react';
import {View, Image, StyleSheet, Alert} from 'react-native';

import {resetPageHistory} from '../elements/controllers/navigation';
import {getData} from '../api/userInfo';
import {checkJWT} from '../api/auth';

export class SplashScreen extends Component<Props> {
  componentDidMount() {
    setTimeout(
      () =>
        getData('userInfo').then(async res => {
          if (res !== undefined && res !== null) {
            if (__DEV__) {
              console.info(res);
            }

            if ((await checkJWT(await JSON.parse(res)?.token)) === 201) {
              Alert.alert(
                'Session expirée !',
                'Votre session a expiré, veuillez vous reconnecter',
              );
              resetPageHistory(this.props.navigation, 'AuthScreen');
              return;
            }

            resetPageHistory(this.props.navigation, 'HomePageScreen');
          } else {
            resetPageHistory(this.props.navigation, 'AuthScreen');
          }
        }),
      800,
    );
  }

  splashView = StyleSheet.create({
    base: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  render() {
    return (
      <View style={this.splashView.base}>
        <Image
          width={250}
          height={250}
          resizeMode="center"
          source={require('../../assets/studybox-logo.png')}
        />
      </View>
    );
  }
}
