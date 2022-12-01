import React from 'react';
import {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export class RoomListPageScreen extends React.Component<Props> {
  style = StyleSheet.create({
    baseContainer: {
      flex: 1,
    },
  });

  render(): ReactNode {
    return (
      <View style={this.style.baseContainer}>
        <Text>hello</Text>
      </View>
    );
  }
}
