import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS_STUDYBOX} from './colors';

import STUDYBOX_ICON from '../../assets/svg/logo_studybox_couleur.svg';

export const Header = () => {
  const style = StyleSheet.create({
    container: {
      width: '100%',
      height: '10%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS_STUDYBOX.BG_WHITE,
    },
    text: {
      marginLeft: 10,
    },
  });

  return (
    <View style={style.container}>
      <STUDYBOX_ICON
        color={COLORS_STUDYBOX.DARK_WHITE}
        width={50}
        height={50}
      />
      <Text style={style.text}>StudyBox</Text>
    </View>
  );
};
