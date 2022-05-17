import axios from 'axios';
import {API} from '../../../config';
import {getData} from './userInfo';

export async function getRooms() {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);
    const route = API.WEB_ROOT + '/rooms';
    const res = await axios.get(route, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    console.log(res);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e.code, e.message, e.response?.data);
    }
    return undefined;
  }
}
