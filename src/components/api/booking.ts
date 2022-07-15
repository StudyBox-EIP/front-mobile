import axios from 'axios';
import {API} from '../../../config';
import {getData} from './userInfo';

// async function getPaymentId(amount: number) {
//   amount *= 100;
//   console.log('OUI');
//   try {
//     const res = await axios.post(
//       `https://api.stripe.com/v1/payment_intents?amount=${amount}&currency=EUR`,
//       {
//         // amount: amount,
//         currency: 'EUR',
//         key: 'pk_test_51IcCYYB7CVKNCpls4Bt29ZG7hpmF2QfttGbEWy0CafC8Bvrg1VzhZmgO2vsbLCVjcVgWU3B7FBEsb5qOknJgoaxI00adPvbA8z',
//       },
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           Authorization: `Bearer sk_test_51IcCYYB7CVKNCplsjrIK4l7kvDRDkgksJG2OwloZQzca9Pa8NEHO8GMADRmH4jzhRoiG5bdaI51Bj20HfGXCkeOp00WYNHn6Gm`,
//         },
//       },
//     );
//     console.log(res.data.id);
//     return res.data.id;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error(error.response);
//     }
//   }
//   return;
// }

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
    console.log(res.data);
    return res.data.id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response);
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
    console.log(data, 'OK', cardInfo, 'KO');
    data.payment_infos.id = await getPaymentMethod(cardInfo);
    const res = await axios.post(route, data, {
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
