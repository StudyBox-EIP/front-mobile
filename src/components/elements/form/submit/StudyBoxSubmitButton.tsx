import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS_STUDYBOX} from '../../colors';

function StudyBoxSubmitButton(props: any) {
  const ComponentStyle = StyleSheet.create({
    button: {
      width: '60%',
      borderColor: 'transparent',
      paddingTop: 12,
      paddingBottom: 12,
      borderRadius: 7,
      marginBottom: 15,
      backgroundColor: COLORS_STUDYBOX.CONFIRM_GREEN,
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 10,
      marginTop: '10%',
    },
    button_text: {
      color: 'white',
      textAlign: 'center',
      fontSize: 17,
      fontFamily: 'RopaSans-Regular',
      fontWeight: 'bold',
    },
  });

  if (props.buttonStyle !== undefined && props.buttonStyle !== null) {
    Object.assign(ComponentStyle.button, props.buttonStyle);
  }

  if (props.textStyle !== undefined && props.textStyle !== null) {
    Object.assign(ComponentStyle.button_text, props.textStyle);
  }

  return (
    <TouchableOpacity onPress={props.onPress} style={ComponentStyle.button}>
      <Text style={ComponentStyle.button_text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

export default StudyBoxSubmitButton;
