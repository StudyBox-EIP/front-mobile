import axios, {AxiosError} from 'axios';
import {Alert} from 'react-native';
import {API} from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export async function login(
  navigation: any,
  data: any,
): Promise<object | AxiosError | Boolean> {
  try {
    const auth = await axios.post(API.WEB_ROOT + '/auth/login', {
      email: data.email,
      password: data.password,
    });
    console.log(auth.data);
    storeData('token', auth.data.token);
    navigation.navigate('HomePageScreen');
    return auth;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        Alert.alert('Wrong Credentials', 'Please, enter correct credentials');
        return error;
      } else if (error.response?.status === 400) {
        Alert.alert('Wrong Credentials', error.response?.data?.message);
      }
    } else {
      Alert.alert('Unknown Error');
    }
  }
  return false;
}

export async function register(
  navigation: any,
  data: any,
): Promise<object | AxiosError | Boolean> {
  try {
    console.log(data);
    const auth = await axios.post(API.WEB_ROOT + '/auth/register', {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
    });
    console.log(auth.data);
    storeData('token', auth.data.token);
    navigation.navigate('HomePageScreen');
    return auth;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        Alert.alert('Wrong Credentials', error.response?.data?.message);
        return error;
      }
    } else {
      Alert.alert('Unknown Error');
    }
  }
  return false;
}
