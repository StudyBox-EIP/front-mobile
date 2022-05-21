import axios from 'axios';
import {API} from '../../../config';
import {getData} from './userInfo';

export async function getFriendList() {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);
    const route = API.WEB_ROOT + '/users/friends?user_id=' + userInfo.id;
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

export async function getFriendRequests() {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);
    const routeReceived = API.WEB_ROOT + '/users/friends/request/receive';
    const resReceived = await axios.get(routeReceived, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });

    const routeSent = `${API.WEB_ROOT}/users/friends/request/send`;
    const resSent = await axios.get(routeSent, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });

    return resReceived.data.concat(resSent.data);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e.code, e.message, e.response?.data);
    }
    return undefined;
  }
}

export async function addFriend(newFriendMail: string) {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }

    const userInfo = JSON.parse(rawUserInfo);
    const route = API.WEB_ROOT + '/users/friends/request/' + newFriendMail;

    await axios.post(
      route,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      },
    );
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e, e.response?.data);
    }
  }
}

export async function answerFriendRequest(requestID: number, answer: Boolean) {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }

    const userInfo = JSON.parse(rawUserInfo);
    const route =
      API.WEB_ROOT +
      `/users/friends/request/${requestID}/${
        answer === true ? 'accept' : 'refuse'
      }`;

    await axios.delete(route, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e, e.response?.data);
    }
  }
}

export async function removeFriend(friendID: number) {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }

    const userInfo = JSON.parse(rawUserInfo);
    const route = `${API.WEB_ROOT}/users/friends/remove/${friendID}`;

    await axios.put(
      route,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      },
    );
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e, e.response?.data);
    }
  }
}
