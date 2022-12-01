import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {COLORS_STUDYBOX} from '../../elements/colors';
import StarSVG from '../../../assets/svg/star.svg';
import React from 'react';

const BasicInfoStyle = StyleSheet.create({
  base: {
    marginBottom: 24,
    width: '100%',
    height: '12%',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    marginHorizontal: 4,
    marginVertical: 2,
  },
  score: {
    fontSize: 12,
    marginVertical: 2,
    padding: 2,
  },
  icon: {
    position: 'absolute',
    top: '20%',
    right: '15%',
  },
});

export const BasicInfo = (props: any) => {
  const basicStyle = StyleSheet.create({
    basicContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    starBarHider: {
      position: 'absolute',
      backgroundColor: COLORS_STUDYBOX.BG_WHITE,
      width: (5 - props.score) * 15,
      height: 15,
      right: 0,
    },
  });

  const scoreMax = 5;

  return (
    <View style={BasicInfoStyle.base}>
      <Text style={BasicInfoStyle.title} adjustsFontSizeToFit>
        {props.name}
      </Text>
      {props.noted > 0 ? (
        <View style={basicStyle.basicContainer}>
          <Text style={BasicInfoStyle.score} adjustsFontSizeToFit>
            Score: {props.score}/{scoreMax}
          </Text>
          <StarSVG
            height={15}
            width={15}
            fill={COLORS_STUDYBOX.STUDYBOX_YELLOW}
          />
          <StarSVG
            height={15}
            width={15}
            fill={COLORS_STUDYBOX.STUDYBOX_YELLOW}
          />
          <StarSVG
            height={15}
            width={15}
            fill={COLORS_STUDYBOX.STUDYBOX_YELLOW}
          />
          <StarSVG
            height={15}
            width={15}
            fill={COLORS_STUDYBOX.STUDYBOX_YELLOW}
          />
          <StarSVG
            height={15}
            width={15}
            fill={COLORS_STUDYBOX.STUDYBOX_YELLOW}
          />
          <View style={basicStyle.starBarHider} />
        </View>
      ) : (
        <TouchableOpacity />
      )}
    </View>
  );
};
