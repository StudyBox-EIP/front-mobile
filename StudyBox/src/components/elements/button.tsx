import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// backgroundColor: '#4bc63b',
//     color: 'white',
//     width: '40%',
//     height: '10%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 10,
//     borderRadius: 10,
function BasicButton(props: any) {
  const style = StyleSheet.create({
    container: {
      backgroundColor: '#4bc63b',
      textAlign: 'center',
      fontSize: 10,
      marginTop: 8,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 80,
    },
    text: {
      color: 'white',
    },
  });

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={props.callback}>
        <Text style={style.text}>{props.txt}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default BasicButton;
