import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS_STUDYBOX} from '../colors';

export default class PageHeader extends React.Component {
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
      backgroundColor: COLORS_STUDYBOX.STUDYBOX_GREEN,
    },
  });

  render() {
    return (
      <View>
        <View style={this.style.titleContainer}>
          <TouchableOpacity onPress={this.props?.callback}>
            <this.props.icon
              width={50}
              height={50}
              fill={COLORS_STUDYBOX.STUDYBOX_GREEN}
            />
          </TouchableOpacity>
          <Text style={this.style.titleText}>{this.props?.headerText}</Text>
        </View>
        <View style={this.style.underline} />
      </View>
    );
  }
}
