import React, {Component} from 'react';
import {View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async (key: string): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(value);
      return true;
    } else {
      return false;
    }
  } catch (e) {
    // error reading value
  }
  return false;
};

export class SplashScreen extends Component<Props> {
  componentDidMount() {
    getData('token').then(res => {
      if (res === true) {
        this.props.navigation.navigate('HomePageScreen');
      } else {
        this.props.navigation.navigate('AuthScreen');
      }
    });
  }

  render() {
    return (
      <View>
        <Image source={require('../../assets/studybox-logo.png')} />
      </View>
    );
  }
}