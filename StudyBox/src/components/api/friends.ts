import axios from 'axios';
import {Alert} from 'react-native';

import {API} from '../../../config';
import {getData} from './userInfo';

export async function getFriendList() {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);
    const route = API.WEB_ROOT + '/auth/' + userInfo.id + '/friends';
    const res = await axios.get(route, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    return res.data.friends;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e.code, e.message, e.response?.data);
    }
    return undefined;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function addFriend(newFriendId: number) {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const rawOldFriendList: Array<any> | null = await getFriendList();
    const oldFriendList: Array<any> =
      rawOldFriendList === null ? [] : rawOldFriendList;

    const userInfo = JSON.parse(rawUserInfo); // will be removed once friend add button is implemented

    const route = API.WEB_ROOT + '/auth/' + userInfo.id + '/friends';
    const newFriendList = oldFriendList
      .map(item => item.id)
      .concat(userInfo.id);

    await axios.put(
      route,
      {
        friends: newFriendList,
      },
      {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      },
    );
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 400) {
        Alert.alert('Friend not found');
        return;
      }
      console.error(e, e.response?.data);
    }
  }
}
