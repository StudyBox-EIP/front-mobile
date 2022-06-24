import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class PageHeader extends React.Component<Props> {
  style = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleText: {
      fontSize: 24,
    },
    underline: {
      width:
        this.props.linePercentage !== undefined
          ? this.props.linePercentage
          : '0%',
      height: 2,
      backgroundColor: '#5ddc4b',
    },
  });

  render() {
    return (
      <View>
        <View style={this.style.titleContainer}>
          <TouchableOpacity onPress={this.props?.callback}>
            <this.props.icon width={50} height={50} fill={'#4bc63b'} />
          </TouchableOpacity>
          <Text style={this.style.titleText}>{this.props?.headerText}</Text>
        </View>
        <View style={this.style.underline} />
      </View>
    );
  }
}
