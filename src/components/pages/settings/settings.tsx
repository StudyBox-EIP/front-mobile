import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {BottomHomePageController} from '../../elements/controllers/homePageController';
import {disconnect} from '../../api/auth';

const SettingsPageScreenStyle = StyleSheet.create({
  base: {
    flex: 1,
  },
});

const SettingsButton = (props: any) => {
  const style = StyleSheet.create({
    container: {
      backgroundColor: props.color,
      borderRadius: 10,
      width: '80%',
      height: 100,
      marginVertical: 15,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
    },
  });

  return (
    <TouchableOpacity style={style.container} onPress={props.callback}>
      <Text style={style.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export class SettingsScreen extends React.Component<Props> {
  render() {
    return (
      <View style={SettingsPageScreenStyle.base}>
        <View style={{}}>
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
        </View>
        <BottomHomePageController navigation={this.props.navigation} />
      </View>
    );
  }
}
