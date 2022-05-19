import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';

import {resetPageHistory} from '../elements/controllers/navigation';
import {getData} from '../api/userInfo';

export class SplashScreen extends Component<Props> {
  componentDidMount() {
    setTimeout(
      () =>
        getData('userInfo').then(res => {
          if (res !== undefined && res !== null) {
            console.info(res);
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
