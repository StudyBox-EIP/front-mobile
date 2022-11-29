import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {faHeart, faListAlt, faMap} from '@fortawesome/free-regular-svg-icons';
import {resetPageHistory} from './navigation';

import SETTINGS_SVG_ICON from '../../../assets/svg/footer/Settings.svg';
import {COLORS_STUDYBOX} from '../colors';

const ICON_SIZE = 34;

export const pageBottomMargin = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '12%',
    bottom: 0,
  },
});

export const pageController = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    height: '10%',
    backgroundColor: COLORS_STUDYBOX.BG_WHITE,
    bottom: 0,
  },
});

export const BottomBarIcon = (props: any) => {
  const iconStyle = StyleSheet.create({
    icon: {
      height: '20%',
      width: '20%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <SafeAreaView style={iconStyle.icon}>
      <TouchableOpacity
        onPress={() => {
          resetPageHistory(props.navigation, props.destPage);
          props.navigation.navigate(props.destPage);
        }}>
        {props.isIconFontAwesome === true ? (
          <FontAwesomeIcon
            color={COLORS_STUDYBOX.BLUE_FOOTER}
            size={ICON_SIZE}
            icon={props.icon}
          />
        ) : (
          <props.icon
            width={ICON_SIZE}
            height={ICON_SIZE}
            color={COLORS_STUDYBOX.BLUE_FOOTER}
          />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export const BottomHomePageController = (props: any) => {
  return (
    <View style={pageController.container}>
      <BottomBarIcon
        icon={faMap}
        isIconFontAwesome={true}
        destPage={'HomePageScreen'}
        navigation={props.navigation}
      />
      <BottomBarIcon
        icon={faListAlt}
        isIconFontAwesome={true}
        destPage={'SettingsPageScreen'}
        navigation={props.navigation}
      />
      <BottomBarIcon
        icon={faHeart}
        isIconFontAwesome={true}
        destPage={'FavoritesPageScreen'}
        navigation={props.navigation}
      />
      <BottomBarIcon
        icon={SETTINGS_SVG_ICON}
        isIconFontAwesome={false}
        destPage={'SettingsPageScreen'}
        navigation={props.navigation}
      />
    </View>
  );
};
