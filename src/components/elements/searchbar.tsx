import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {COLORS_STUDYBOX} from '../elements/colors';
import SearchIcon from '../../assets/svg/icons8-search.svg';

export default BasicSearchBar;

function BasicSearchBar(props: any) {
  const style = StyleSheet.create({
    searchBar: {
      marginTop: 8,
      marginBottom: 2,
      width: '92%',
      borderRadius: 7,
      backgroundColor: 'white',
      shadowColor: 'black',
      color: 'black',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textInput: {},
    icon: {
      margin: 2,
      marginHorizontal: 8,
      size: 32,
      fill: COLORS_STUDYBOX.STUDYBOX_GREEN,
    },
  });

  return (
    <View style={style.searchBar}>
      <SearchIcon
        style={style.icon}
        width={style.icon.size}
        height={style.icon.size}
        fill={style.icon.fill}
      />
      <TextInput
        style={style.textInput}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
      />
    </View>
  );
}
