import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS_STUDYBOX} from './colors';

export const Header = (props: any) => {
  const style = StyleSheet.create({
    container: {
      width: '100%',
      height: '10%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: COLORS_STUDYBOX.BG_WHITE,
    },
    studyboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: '5%',
    },
    text: {
      marginLeft: 10,
    },
    profileContainer: {
      width: '100%',
      height: '100%',
      flex: 1,
      justifyContent: 'center',
    },
    profileImageBackground: {
      backgroundColor: COLORS_STUDYBOX.DARK_WHITE,
      width: '15%',
      height: '75%',
      alignSelf: 'flex-end',
      marginRight: '10%',
      borderRadius: 100,
      position: 'absolute',
      right: 0,
    },
    profileImage: {
      width: '15%',
      height: '50%',
      alignSelf: 'flex-end',
      marginRight: '10%',
      position: 'absolute',
      right: 0,
    },
    studyboxImage: {
      width: 40,
      height: 40,
    },
  });

  return (
    <View style={style.container}>
      <View style={style.studyboxContainer}>
        <Image
          style={style.studyboxImage}
          resizeMode="contain"
          source={require('../../assets/studybox-logo.png')}
        />
        <Text style={style.text}>StudyBox</Text>
      </View>
      <View style={style.profileContainer}>
        <TouchableOpacity style={style.profileImageBackground} />
        <Image
          style={style.profileImage}
          source={props.image}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};
