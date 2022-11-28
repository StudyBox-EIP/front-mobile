import React from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import {COLORS_STUDYBOX} from '../../colors';

function StudyBoxTextInput(props: any) {
  const ComponentStyle = StyleSheet.create({
    label_text: {
      fontSize: 16,
      fontFamily: 'RopaSans-Regular',
      color: COLORS_STUDYBOX.STUDYBOX_BLACK,
    },
    textInput: {
      maxWidth: (Dimensions.get('screen').width / 100) * 70,
      width: '100%',
      borderRadius: 7,
      marginBottom: 15,
      backgroundColor: 'white',
      shadowColor: 'black',
      color: 'black',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 10,
    },
  });

  return (
    <View>
      <Text style={ComponentStyle.label_text}>{props.text}</Text>
      <TextInput
        style={ComponentStyle.textInput}
        autoCompleteType={props.autoCompleteType}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        onChangeText={newText => {
          props.changeText(newText);
        }}
      />
    </View>
  );
}

export default StudyBoxTextInput;
