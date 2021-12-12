import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-svg';
import {BottomHomePageController} from '../../elements/controllers/homePageController';

const SettingsPageScreenStyle = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
  },
});

export class SettingsScreen extends React.Component<Props> {
  render() {
    return (
      <View style={SettingsPageScreenStyle.base}>
        <Text>Settings</Text>
        <BottomHomePageController navigation={this.props.navigation} />
      </View>
    );
  }
}
