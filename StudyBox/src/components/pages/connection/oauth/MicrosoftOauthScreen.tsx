import React, {Props} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {authorize} from 'react-native-app-auth';
import {config} from './config';

const MicrosoftOauthScreenStyle = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export class MicrosoftOauthScreen extends React.Component<Props> {
  componentDidMount() {
    this.oauthMicrosoft(this.props.navigation);
  }

  oauthMicrosoft = navigation => {
    authorize(config.microsoft)
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
      <View style={MicrosoftOauthScreenStyle.base}>
        <Text>MicrosoftOauthScreen</Text>
      </View>
    );
  }
}
