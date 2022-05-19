import axios from 'axios';
import {API} from '../../../config';
import {getData} from './userInfo';

export async function getRooms(roomName: String = '') {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);
    let route = API.WEB_ROOT + '/rooms';

    if (roomName !== '') {
      route += `?name_substr=${roomName}`;
    }

    const res = await axios.get(route, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e.code, e.message, e.response?.data);
    }
    return undefined;
  }
}

export async function getRoomsNearby(
  latitude: number,
  longitude: number,
  radius: number = 10,
) {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);
    const route =
      API.WEB_ROOT +
      `/rooms/nearby?lat=${latitude}&long=${longitude}&r=${radius}`;
    const res = await axios.get(route, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
}
