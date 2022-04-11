import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// This is the basic green Button (It is smooth on the sides)
function BasicButton(props: any) {
  const style = StyleSheet.create({
    container: {
      backgroundColor: '#4bc63b',
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

  return (
    <TouchableOpacity style={style.container} onPress={props.callback}>
      <Text style={style.text}>{props.txt}</Text>
    </TouchableOpacity>
  );
}

export default BasicButton;
