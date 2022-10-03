import axios from 'axios';
import {API} from '../../../config';
import {getBearerHeader} from './API_tools';
import {getData} from './userInfo';

export async function getFavorites() {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);

    const res = await axios.get(
      API.WEB_ROOT + '/auth/favorites',
      getBearerHeader(userInfo.token),
    );

    return res.data?.favorite_rooms;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.info(error);
    }
  }
}

export async function addFavorite(room_id: number) {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);

    const res = await axios.post(
      API.WEB_ROOT + '/auth/favorites',
      {
        room_id,
      },
      getBearerHeader(userInfo.token),
    );

    return res.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.info(error);
      return error.response?.status;
    }
    return undefined;
  }
}

export async function removeFavorite(room_id: number) {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);

    const res = await axios.delete(
      API.WEB_ROOT + `/auth/favorites/${room_id}`,
      getBearerHeader(userInfo.token),
    );

    return res.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.info(error);
      return error.response?.status;
    }
    return undefined;
  }
}
