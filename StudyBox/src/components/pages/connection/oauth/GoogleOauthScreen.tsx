import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {authorize} from 'react-native-app-auth';
import {config} from './config';

const GoogleOauthScreenStyle = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export class GoogleOauthScreen extends React.Component<Props> {
  componentDidMount() {
    this.oauthGoogle(this.props.navigation);
  }

  oauthGoogle = navigation => {
    authorize(config.google)
      .then(authState => {
        console.info(authState);
        navigation.navigate('HomePageScreen');
      })
      .catch(error => {
        console.error(error);
        navigation.navigate('Connection');
      });
  };

  render() {
    return (
      <View style={GoogleOauthScreenStyle.base}>
        <Text>GoogleOauthScreen</Text>
      </View>
    );
  }
}
