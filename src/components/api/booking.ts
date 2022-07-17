import axios from 'axios';
import {API} from '../../../config';
import {getData} from './userInfo';

async function getPaymentMethod(cardInfo: Object) {
  try {
    const res = await axios.post(
      `https://api.stripe.com/v1/payment_methods?type=card&card[number]=${cardInfo.number}&card[cvc]=${cardInfo.cvc}&card[exp_month]=${cardInfo.exp_month}&card[exp_year]=${cardInfo.exp_year}`,
      {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Bearer sk_test_51IcCYYB7CVKNCplsjrIK4l7kvDRDkgksJG2OwloZQzca9Pa8NEHO8GMADRmH4jzhRoiG5bdaI51Bj20HfGXCkeOp00WYNHn6Gm',
        },
      },
    );
    return res.data.id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response);
    } else {
      console.error(error);
    }
  }
}

export async function makeBooking(data: any, cardInfo: Object) {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);
    const route = API.WEB_ROOT + '/users/reservations';
    data.payment_infos = {
      id: await getPaymentMethod(cardInfo),
    };
    const res = await axios.post(route, data, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    if (__DEV__) {
      console.info(res.data);
    }
    return true;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e.code, e.message, e.response?.data);
    } else {
      console.error(e);
    }
    return false;
  }
}

export async function getBooking() {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);
    const route = API.WEB_ROOT + '/users/reservations';

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

export async function getSeatAvailibility(id: number, timestamp: number) {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);
    const res = await axios.get(
      `${API.WEB_ROOT}/rooms/${id}/availability/${timestamp}`,
      {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      },
    );

    return res.data[0]?.current_seats_available;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e.code, e.message, e.response?.data);
    }
    return undefined;
  }
}
