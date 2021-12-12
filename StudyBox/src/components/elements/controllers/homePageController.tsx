import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SettingsScreen} from '../../pages/settings/settings';
import {faUserCircle as farUserCircle} from '@fortawesome/free-regular-svg-icons';
// import {faUserCircle as fasUserCircle} from '@fortawesome/free-solid-svg-icons';
import {faCompass as farCompass} from '@fortawesome/free-regular-svg-icons';
// import {faCompass as fasCompass} from '@fortawesome/free-solid-svg-icons';
import {faHeart as farHeart} from '@fortawesome/free-regular-svg-icons';
// import {faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons';

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
    paddingHorizontal: '10%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    height: '12%',
    backgroundColor: 'white',
    bottom: 0,
  },
});

export const BottomBarIcon = (props: any) => {
  const iconStyle = StyleSheet.create({
    icon: {
      // backgroundColor: 'black',
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
          props.navigation.navigate(props.destPage);
        }}>
        <FontAwesomeIcon size={42} icon={props.icon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export const BottomHomePageController = (props: any) => {
  return (
    <View style={pageController.container}>
      <BottomBarIcon
        icon={farCompass}
        destPage={'HomePageScreen'}
        navigation={props.navigation}
      />
      <BottomBarIcon
        icon={farHeart}
        destPage={'HomePageScreen'}
        navigation={props.navigation}
      />
      <BottomBarIcon
        icon={farUserCircle}
        destPage={'SettingsPageScreen'}
        navigation={props.navigation}
      />
    </View>
  );
};
