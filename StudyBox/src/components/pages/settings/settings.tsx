import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {BottomHomePageController} from '../../elements/controllers/homePageController';
import {disconnect} from '../../api/auth';

const SettingsPageScreenStyle = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
  },
});

const SettingsButton = (props: any) => {
  const style = StyleSheet.create({
    container: {
      backgroundColor: props.color,
      width: '80%',
      height: '10%',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
      borderRadius: 10,
    },
  });

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={props.callback}>
        <Text>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export class SettingsScreen extends React.Component<Props> {
  render() {
    return (
      <View style={SettingsPageScreenStyle.base}>
        <SettingsButton
          text="Mes Amis"
          color="grey"
          callback={() => this.props.navigation.navigate('FriendsView')}
        />
        <SettingsButton
          text="Mes Groupes de Travail"
          color="grey"
          callback={undefined}
        />
        <SettingsButton
          text="Déconnexion"
          color="red"
          callback={() => disconnect(this.props.navigation)}
        />
        <BottomHomePageController navigation={this.props.navigation} />
      </View>
    );
  }
}
