import React, {Props} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const HomePageScreenStyle = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export class HomePageScreen extends React.Component<Props> {
  render() {
    return (
      <View style={HomePageScreenStyle.base}>
        <Text>HomePageScreen</Text>
      </View>
    );
  }
}
