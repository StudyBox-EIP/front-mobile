import axios, {AxiosError} from 'axios';
import {Alert} from 'react-native';

import {API} from '../../../config';
import {resetPageHistory} from '../elements/controllers/navigation';
import {storeData, removeData} from './userInfo';

export async function login(
  navigation: any,
  data: any,
): Promise<object | AxiosError | Boolean> {
  if (__DEV__) {
    console.log('API : ', API.WEB_ROOT);
  }
  try {
    const auth = await axios.post(API.WEB_ROOT + '/auth/login', {
      email: data.email,
      password: data.password,
    });
    storeData('userInfo', JSON.stringify(auth.data));
    resetPageHistory(navigation, 'HomePageScreen');
    return auth;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        Alert.alert('Wrong Credentials', 'Please, enter correct credentials');
        return error;
      } else if (error.response?.status === 400) {
        Alert.alert('Wrong Credentials', error.response?.data?.message);
      } else {
        console.error(error);
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
    const auth = await axios.post(API.WEB_ROOT + '/auth/register', {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
    });
    navigation.navigate('AuthScreen');
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

export async function disconnect(navigation: any) {
  if ((await removeData('userInfo')) === true) {
    navigation.navigate('AuthScreen');
  }
}
