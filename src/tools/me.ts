import axios from 'axios';
import {API} from '../../config';
import {getData} from '../components/api/userInfo';

export async function getPictureObject(picture: String) {
  var errorReturn = require('../assets/img/MBA_Lyon.jpg');

  if (picture === null || picture === undefined) {
    return errorReturn;
  }
  console.log('Image Hash: ' + picture);
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    console.log('1');

    const userInfo = JSON.parse(rawUserInfo);
    console.log('2');

    const route = API.WEB_ROOT + '/file/show/' + picture;
    console.log('3');

    const res = await axios.get(route, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    console.log('4');
    console.log(res.status === 200);

    return res.status === 200 ? {uri: res.data} : errorReturn;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e.code, e.message, e.response?.data);
    }
    return errorReturn;
  }
}
