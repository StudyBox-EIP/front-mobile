import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS_STUDYBOX} from './colors';

import STUDYBOX_ICON from '../../assets/svg/logo_studybox_couleur.svg';

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
  });

  return (
    <View style={style.container}>
      <View style={style.studyboxContainer}>
        <STUDYBOX_ICON
          color={COLORS_STUDYBOX.DARK_WHITE}
          width={50}
          height={50}
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
