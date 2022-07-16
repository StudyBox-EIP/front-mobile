import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS_STUDYBOX} from '../elements/colors';

// This is the basic green Button (It is smooth on the sides)
function BasicButton(props: any) {
  const style = StyleSheet.create({
    container: {
      backgroundColor: COLORS_STUDYBOX.GREEN,
      textAlign: 'center',
      fontSize: 10,
      marginVertical: 8,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 80,
    },
    text: {
      color: 'white',
    },
  });

  const container =
    props.style == null
      ? StyleSheet.compose(props.style, style.container)
      : style.container;
  return (
    <TouchableOpacity style={container} onPress={props.callback}>
      <Text style={style.text}>{props.txt}</Text>
    </TouchableOpacity>
  );
}

export default BasicButton;
