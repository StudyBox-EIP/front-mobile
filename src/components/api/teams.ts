import axios from 'axios';
import {API} from '../../../config';
import {getData} from './userInfo';

export async function getTeams(teamID: number = -1) {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);
    const route = `${API.WEB_ROOT}/users/teams${
      teamID >= 0 ? `?id=${teamID}` : ''
    }`;
    const config = {headers: {Authorization: `Bearer ${userInfo.token}`}};

    const res = await axios.get(route, config);
    if (teamID >= 0) {
      for (const team of res.data) {
        if (team.id === teamID) {
          return team;
        }
      }
    } else {
      return res.data;
    }
    return teamID >= 0 ? res.data[0] : res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e.code, e.message, e.response?.data);
    }
    return undefined;
  }
}

export async function renameTeam(teamID: number) {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);
    const route = `${API.WEB_ROOT}/users/teams/${teamID}`;
    const config = {headers: {Authorization: `Bearer ${userInfo.token}`}};

    const res = await axios.put(route, {}, config);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e.code, e.message, e.response?.data);
    }
    return undefined;
  }
}

export async function removeUserFromTeam(teamID: number, userID: number) {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);
    const route = `${API.WEB_ROOT}/users/teams/${teamID}/remove/${userID}`;
    const config = {headers: {Authorization: `Bearer ${userInfo.token}`}};

    const res = await axios.put(route, {}, config);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e.code, e.message, e.response?.data);
    }
    return undefined;
  }
}

export async function createTeam(teamName: string) {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);
    const route = `${API.WEB_ROOT}/users/teams`;
    const config = {headers: {Authorization: `Bearer ${userInfo.token}`}};

    const res = await axios.post(route, {name: teamName}, config);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e.code, e.message, e.response?.data);
    }
    return undefined;
  }
}

export async function deleteTeam(teamID: number) {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);
    const route = `${API.WEB_ROOT}/users/teams/${teamID}`;
    const config = {headers: {Authorization: `Bearer ${userInfo.token}`}};

    const res = await axios.delete(route, config);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e.code, e.message, e.response?.data);
    }
    return undefined;
  }
}

export async function getInboundTeamRequest() {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);
    const route = `${API.WEB_ROOT}/users/teams/request/receive`;
    const config = {headers: {Authorization: `Bearer ${userInfo.token}`}};

    const res = await axios.get(route, config);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e.code, e.message, e.response?.data);
    }
    return undefined;
  }
}

export async function getOutboundTeamRequest() {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);
    const route = `${API.WEB_ROOT}/users/teams/request/send`;
    const config = {headers: {Authorization: `Bearer ${userInfo.token}`}};

    const res = await axios.get(route, config);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e.code, e.message, e.response?.data);
    }
    return undefined;
  }
}

export async function sendTeamRequest(teamID: number, userMail: string) {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);
    const route = `${API.WEB_ROOT}/users/teams/request/${userMail}/${teamID}`;
    const config = {headers: {Authorization: `Bearer ${userInfo.token}`}};

    const res = await axios.post(route, {}, config);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e.code, e.message, e.response?.data);
    }
    return undefined;
  }
}

export async function answerTeamRequest(requestID: number, answer: Boolean) {
  try {
    const rawUserInfo = await getData('userInfo');
    if (rawUserInfo === undefined || rawUserInfo === null) {
      throw 'userInfo not found';
    }
    const userInfo = JSON.parse(rawUserInfo);
    const route = `${API.WEB_ROOT}/users/teams/request/${requestID}/${
      answer === true ? 'accept' : 'refuse'
    }`;
    const config = {headers: {Authorization: `Bearer ${userInfo.token}`}};

    const res = await axios.delete(route, config);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e.code, e.message, e.response?.data);
    }
    return undefined;
  }
}
