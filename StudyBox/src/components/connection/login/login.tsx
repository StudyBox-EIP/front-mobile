import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ManualSignInScreenStyle = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export function ManualSignInScreen({navigation}: any) {
  return (
    <View style={ManualSignInScreenStyle.base}>
      <Text>ManualSignInScreen</Text>
    </View>
  );
}
