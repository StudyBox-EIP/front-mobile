import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BottomHomePageController} from '../../elements/controllers/homePageController';
import {TouchableOpacity} from 'react-native-gesture-handler';

const removeValue = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

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
  async disconnect(navigation: any) {
    if ((await removeValue('token')) === true) {
      navigation.navigate('AuthScreen');
    }
  }

  render() {
    return (
      <View style={SettingsPageScreenStyle.base}>
        <SettingsButton text="Mes Amis" color="grey" callback={undefined} />
        <SettingsButton
          text="Mes Groupes de Travail"
          color="grey"
          callback={undefined}
        />
        <SettingsButton
          text="Déconnexion"
          color="red"
          callback={() => this.disconnect(this.props.navigation)}
        />
        <BottomHomePageController navigation={this.props.navigation} />
      </View>
    );
  }
}
