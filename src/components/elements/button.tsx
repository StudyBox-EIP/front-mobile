import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS_STUDYBOX} from '../elements/colors';

// This is the basic green Button (It is smooth on the sides)
export function BasicButton(props: any) {
  const style = StyleSheet.create({
    container: {
      backgroundColor: COLORS_STUDYBOX.STUDYBOX_GREEN,
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
    props.style != null
      ? StyleSheet.compose(props.style, style.container)
      : style.container;
  return (
    <TouchableOpacity style={container} onPress={props.callback}>
      <Text style={style.text}>{props.txt}</Text>
    </TouchableOpacity>
  );
}

export function BasicIcon(props: any) {
  const style = StyleSheet.create({
    container: {
      backgroundColor: COLORS_STUDYBOX.STUDYBOX_GREEN,
      textAlign: 'center',
      marginVertical: 8,
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 80,
    },
  });

  const container =
    props.style != null
      ? StyleSheet.compose(props.style, style.container)
      : style.container;
  return (
    <TouchableOpacity style={container} onPress={props.callback}>
      <props.Icon
        width={props.size}
        height={props.size}
        fill={COLORS_STUDYBOX.DARK_WHITE}
      />
    </TouchableOpacity>
  );
}
